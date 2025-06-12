import { renderHook, waitFor } from '@testing-library/react';
import { useGetLinks } from '../useGetLinks';
import { createWrapper } from '../../../../test/wrapper';

describe('useGetLinks', () => {
  it('링크 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useGetLinks(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].title).toBe('test title');
    });
  });
});
