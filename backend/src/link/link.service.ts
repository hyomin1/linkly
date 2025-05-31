import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';

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

    if (exists) {
      throw new ConflictException('이미 등록된 링크입니다.');
    }
    return await this.prisma.link.create({
      data: { url: formattedUrl, title: dto.title },
    });
  }

  async getAllLinks() {
    return await this.prisma.link.findMany();
  }
}
