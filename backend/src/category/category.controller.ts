import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category-dto';
import { RequestUser } from 'src/user/types/request-user';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category-dto';

interface RequestWithUser extends Request {
  user: RequestUser;
}

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: RequestWithUser,
  ): Promise<Category> {
    const userId = req.user.id;
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: RequestWithUser): Promise<Category[]> {
    const userId = req.user.id;
    return this.categoryService.getAllCategoriesByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const userId = req.user.id;
    return this.categoryService.deleteCategory(+id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.categoryService.updateCategory(+id, updateCategoryDto, userId);
  }
}
