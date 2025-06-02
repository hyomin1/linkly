import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';
import { UpdateLinkDto } from './dto/update-link.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLinkDto): Promise<Link> {
    const formattedUrl = dto.url.startsWith('http')
      ? dto.url
      : `https://${dto.url}`;
    const exists = await this.prisma.link.findUnique({
      where: { url: formattedUrl },
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
      },
    });
  }

  async getAllLinks() {
    return await this.prisma.link.findMany();
  }

  async deleteLink(id: number): Promise<void> {
    await this.prisma.link.delete({
      where: { id },
    });
  }

  async updateLink(id: number, dto: UpdateLinkDto): Promise<Link> {
    return this.prisma.link.update({
      where: { id },
      data: dto,
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
        ($('title').text().trim() || null);

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
