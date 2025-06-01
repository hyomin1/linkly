import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLink } from '../api/linkApi';
import toast from 'react-hot-toast';

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('링크가 삭제되었습니다!');
    },
    onError: () => {
      toast.error('링크 삭제에 실패했습니다.');
    },
  });
}
