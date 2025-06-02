import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  findAll(): Promise<Link[]> {
    return this.linkService.getAllLinks();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.linkService.deleteLink(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    return this.linkService.updateLink(+id, updateLinkDto);
  }

  @Get('metadata')
  async getMetadata(@Query('url') url: string) {
    return this.linkService.extractMetadata(url);
  }
}
