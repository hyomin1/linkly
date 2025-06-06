import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../api/categoryApi';
import toast from 'react-hot-toast';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리가 삭제되었습니다!');
    },
    onError: () => {
      toast.error('카테고리 삭제에 실패했습니다.');
    },
  });
}
