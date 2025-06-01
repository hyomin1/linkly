import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLink } from '../api/linkApi';
import toast from 'react-hot-toast';

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('링크가 수정되었습니다!');
    },
    onError: () => {
      toast.error('링크 수정에 실패했습니다.');
    },
  });
}
