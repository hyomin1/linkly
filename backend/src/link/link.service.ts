import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async createLink(url: string) {
    return await this.prisma.link.create({
      data: { url },
    });
  }

  async getAllLinks() {
    return await this.prisma.link.findMany();
  }
}
