import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Request } from 'express';
import { RequestUser } from 'src/user/types/request-user';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: RequestUser;
}

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createLinkDto: CreateLinkDto,
    @Req() req: RequestWithUser,
  ): Promise<Link> {
    const userId = req.user.id;
    return this.linkService.create(createLinkDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: RequestWithUser): Promise<Link[]> {
    const userId = req.user.id;
    return this.linkService.getAllLinksByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const userId = req.user.id;

    return this.linkService.deleteLink(+id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @Req() req: RequestWithUser,
  ): Promise<Link> {
    const userId = req.user.id;
    return this.linkService.updateLink(+id, updateLinkDto, userId);
  }

  @Get('metadata')
  @UseGuards(JwtAuthGuard)
  async getMetadata(@Query('url') url: string) {
    return this.linkService.extractMetadata(url);
  }
}
