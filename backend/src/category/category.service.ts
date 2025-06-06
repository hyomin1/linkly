import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto, userId: number): Promise<Category> {
    const { name } = dto;
    const exists = await this.prisma.category.findUnique({
      where: { name },
    });

    if (exists) {
      throw new ConflictException('이미 등록된 카테고리입니다.');
    }

    return await this.prisma.category.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
  async getAllCategoriesByUserId(userId: number): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: { userId },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async deleteCategory(id: number, userId: number): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('링크를 찾을 수 없습니다.');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    await this.prisma.link.updateMany({
      where: { categoryId: id },
      data: { categoryId: null },
    });

    await this.prisma.category.delete({ where: { id } });
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    userId: number,
  ): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category || category.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }
}
