import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '../api/linkApi';
import toast from 'react-hot-toast';

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLink,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('링크가 등록되었습니다!');
    },
    onError: () => {
      toast.error('링크 등록에 실패했습니다.');
    },
  });
}
