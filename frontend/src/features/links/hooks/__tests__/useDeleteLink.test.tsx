import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteLink } from '../useDeleteLink';
import { createWrapper } from '../../../../test/wrapper';

describe('useDeleteLink', () => {
  it('링크 삭제 성공 시 isSuccess가 true가 되어야 한다.', async () => {
    const { result } = renderHook(() => useDeleteLink(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(1);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
