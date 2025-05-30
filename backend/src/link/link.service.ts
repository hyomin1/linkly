import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkService {
  private links: string[] = [];
  handleLink(url: string) {
    this.links.push(url);

    return { message: 'URL Received', url };
  }

  getAllLinks() {
    return this.links.map((url, index) => ({ id: index + 1, url }));
  }
}
