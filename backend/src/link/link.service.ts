import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';
import { UpdateLinkDto } from './dto/update-link.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLinkDto, userId: number): Promise<Link> {
    const { url, categoryId } = dto;
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const exists = await this.prisma.link.findUnique({
      where: {
        userId_url: {
          userId,
          url: formattedUrl,
        },
      },
    });

    const metadata = await this.extractMetadata(formattedUrl);

    const { title, description, image, siteName } = metadata;

    if (exists) {
      throw new ConflictException('이미 등록된 링크입니다.');
    }
    return await this.prisma.link.create({
      data: {
        url: formattedUrl,
        title,
        description,
        image,
        siteName,
        user: {
          connect: { id: userId },
        },
        category:
          typeof categoryId === 'number'
            ? { connect: { id: categoryId } }
            : undefined,
      },
    });
  }

  async getAllLinksByUserId(userId: number): Promise<Link[]> {
    return await this.prisma.link.findMany({
      where: { userId },
      orderBy: [{ categoryId: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async deleteLink(id: number, userId: number): Promise<void> {
    const link = await this.prisma.link.findUnique({
      where: { id },
    });
    if (!link) {
      throw new NotFoundException('링크를 찾을 수 없습니다.');
    }

    if (link.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    await this.prisma.link.delete({ where: { id } });
  }

  async updateLink(
    id: number,
    dto: UpdateLinkDto,
    userId: number,
  ): Promise<Link> {
    const link = await this.prisma.link.findUnique({ where: { id } });

    if (!link || link.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return await this.prisma.link.update({
      where: { id },
      data: {
        title: dto.title,
        url: dto.url,
        category:
          dto.categoryId === null
            ? { disconnect: true }
            : dto.categoryId !== undefined
              ? { connect: { id: dto.categoryId } }
              : undefined,
      },
    });
  }

  async toggleFavorite(id: number, userId: number): Promise<Link> {
    const link = await this.prisma.link.findUnique({ where: { id } });
    if (!link || link.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }
    return this.prisma.link.update({
      where: { id },
      data: { isFavorite: !link.isFavorite },
    });
  }

  async getFavoriteLinks(userId: number): Promise<Link[]> {
    return await this.prisma.link.findMany({
      where: { userId, isFavorite: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async extractMetadata(url: string) {
    try {
      const response = await axios.get<string>(url, { timeout: 5000 });
      const $ = cheerio.load(response.data);

      const getContent = (selector: string): string | null => {
        const content = $(selector).attr('content')?.trim();
        return content && content.length > 0 ? content : null;
      };

      const title =
        getContent('meta[property="og:title"]') ??
        ($('title').text().trim() || null) ??
        new URL(url).hostname;

      const description =
        getContent('meta[property="og:description"]') ??
        getContent('meta[name="description"]');
      const image = getContent('meta[property="og:image"]');
      const siteName =
        getContent('meta[property="og:site_name"]') ?? new URL(url).hostname;
      return { title, description, image, siteName };
    } catch (error) {
      console.error('메타데이터 추출 실패:', error);
      return {
        title: null,
        description: null,
        image: null,
        siteName: new URL(url).hostname,
      };
    }
  }
}
