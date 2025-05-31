import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLinkDto) {
    return await this.prisma.link.create({
      data: { url: dto.url, title: dto.title },
    });
  }

  async getAllLinks() {
    return await this.prisma.link.findMany();
  }
}
