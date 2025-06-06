import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCategory } from '../api/categoryApi';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리가 등록되었습니다!');
    },
    onError: () => {
      toast.error('카테고리 등록에 실패했습니다.');
    },
  });
}
