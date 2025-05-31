import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  // @Get()
  // findAll() {
  //   return this.linkService.getAllLinks();
  // }
}
