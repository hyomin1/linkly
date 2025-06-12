import { http, HttpResponse } from 'msw';
import type { Link } from '../features/links/types/link';

export const handlers = [
  http.post('/api/links', async ({ request }) => {
    const data = (await request.json()) as Pick<Link, 'url' | 'categoryId'>;
    return HttpResponse.json({
      id: 1,
      ...data,
    });
  }),
  http.delete(`/api/links/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      message: `Link with id ${id} deleted`,
    });
  }),

  http.get('/api/links', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'test title',
        description: 'test link',
        image: 'https://example.com/image.png',
        siteName: 'Example Site',
        url: 'https://example.com',
        isFavorite: false,
        createdAt: new Date().toISOString(),
        categoryId: null,
      },
    ]);
  }),
];
