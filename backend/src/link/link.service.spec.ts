import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

describe('LinkService', () => {
  let service: LinkService;
  //let prisma: PrismaService;

  const mockPrisma = {
    link: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
    //prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const mockMetadata = {
      title: 'Test Title',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      siteName: 'example.com',
    };

    const mockCreatedLink = {
      id: 1,
      url: 'https://example.com',
      title: 'Test Title',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      siteName: 'example.com',
      userId: 1,
      categoryId: 2,
      isFavorite: false,
    };

    beforeEach(() => {
      jest.spyOn(service, 'extractMetadata').mockResolvedValue(mockMetadata);
    });
    it('should throw ConflictException if link already exists', async () => {
      const existingLink = { id: 1, userId: 1, url: 'https://example.com' };
      mockPrisma.link.findUnique.mockResolvedValueOnce(existingLink);

      await expect(
        service.create({ url: 'https://example.com' }, 1),
      ).rejects.toThrow(new ConflictException('이미 등록된 링크입니다.'));
    });

    it('should create a new link when it does not exist', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce(null);
      mockPrisma.link.create.mockResolvedValue(mockCreatedLink);

      const result = await service.create(
        {
          url: 'https://example.com',
          categoryId: 2,
        },
        1,
      );

      expect(mockPrisma.link.findUnique).toHaveBeenCalledWith({
        where: {
          userId_url: {
            userId: 1,
            url: 'https://example.com',
          },
        },
      });

      expect(mockPrisma.link.create).toHaveBeenCalledWith({
        data: {
          url: 'https://example.com',
          title: 'Test Title',
          description: 'Test Description',
          image: 'https://example.com/image.jpg',
          siteName: 'example.com',
          user: {
            connect: { id: 1 },
          },
          category: { connect: { id: 2 } },
        },
      });
      expect(result).toEqual(mockCreatedLink);
    });
  });

  describe('getAllLinksByUserId()', () => {
    it('should return all links ofr a given userId', async () => {
      const mockLinks = [
        {
          id: 1,
          url: 'https://example1.com',
          title: 'Example 1',
          description: 'desc1',
          image: null,
          siteName: 'example1.com',
          userId: 1,
          categoryId: 1,
          isFavorite: false,
          createdAt: new Date(),
        },
        {
          id: 2,
          url: 'https://example2.com',
          title: 'Example 2',
          description: 'desc2',
          image: null,
          siteName: 'example2.com',
          userId: 1,
          categoryId: 2,
          isFavorite: false,
          createdAt: new Date(),
        },
      ];

      mockPrisma.link.findMany.mockResolvedValueOnce(mockLinks);

      const result = await service.getAllLinksByUserId(1);

      expect(mockPrisma.link.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        orderBy: [{ categoryId: 'asc' }, { createdAt: 'desc' }],
      });

      expect(result).toEqual(mockLinks);
    });
  });

  describe('deleteLink()', () => {
    const userId = 1;
    const linkId = 10;
    it('should throw NotFoundException if the link does not exist', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce(null);

      await expect(service.deleteLink(linkId, userId)).rejects.toThrow(
        new NotFoundException('링크를 찾을 수 없습니다.'),
      );

      expect(mockPrisma.link.findUnique).toHaveBeenCalledWith({
        where: { id: linkId },
      });
    });

    it('should throw ForbiddenException if user is not to owner', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce({
        id: linkId,
        userId: 2,
      });

      await expect(service.deleteLink(linkId, userId)).rejects.toThrow(
        new ForbiddenException('삭제 권한이 없습니다.'),
      );
    });

    it('should delete the link if user is the owner', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce({
        id: linkId,
        userId,
      });

      mockPrisma.link.delete.mockResolvedValueOnce(undefined);

      await service.deleteLink(linkId, userId);

      expect(mockPrisma.link.delete).toHaveBeenCalledWith({
        where: { id: linkId },
      });
    });
  });
  describe('updateLink(', () => {
    const linkId = 1;
    const userId = 100;

    const existingLink = {
      id: linkId,
      userId,
      title: 'Old Title',
      url: 'https://old-url.com',
    };

    it('should throw ForbiddenException if the user is not the owner', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce({
        ...existingLink,
        userId: 999,
      });

      await expect(
        service.updateLink(
          linkId,
          { title: 'New', url: 'https://new.com' },
          userId,
        ),
      ).rejects.toThrow(new ForbiddenException('수정 권한이 없습니다.'));
    });

    it('should update link and disconnect category if categoryId is null', async () => {
      mockPrisma.link.findUnique.mockResolvedValueOnce(existingLink);
      mockPrisma.link.update.mockResolvedValueOnce({
        ...existingLink,
        title: 'Updated Title',
      });

      const dto = {
        title: 'Updated Title',
        url: 'https://updated.com',
        categoryId: undefined,
      };

      const result = await service.updateLink(linkId, dto, userId);

      expect(mockPrisma.link.update).toHaveBeenCalledWith({
        where: { id: linkId },
        data: {
          title: dto.title,
          url: dto.url,
          category: undefined,
        },
      });

      expect(result.title).toBe('Updated Title');
    });
  });
});
