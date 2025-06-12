import { renderHook, waitFor } from '@testing-library/react';
import { useCreateLink } from '../useCreateLink';
import { server } from '../../../../mocks/node';
import { http, HttpResponse } from 'msw';
import { createWrapper } from '../../../../test/wrapper';

describe('useCreateLink', () => {
  it('링크 생성 성공 시 isSuccess가 true가 되어야 한다', async () => {
    const { result } = renderHook(() => useCreateLink(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      url: 'https://example.com',
      categoryId: 1,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('링크 생성 실패 시 isError가 true가 되어야 한다', async () => {
    // 이 테스트에서만 실패 응답으로 덮어쓰기
    server.use(
      http.post('/api/links', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useCreateLink(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      url: 'https://example.com',
      categoryId: 1,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
