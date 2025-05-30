import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() body: { url: string }) {
    return this.linkService.handleLink(body.url);
  }

  @Get()
  findAll() {
    return this.linkService.getAllLinks();
  }
}
