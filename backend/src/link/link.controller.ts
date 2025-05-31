import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from '@prisma/client';

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
}
