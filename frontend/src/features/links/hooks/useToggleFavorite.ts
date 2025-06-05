import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavorite } from '../api/linkApi';
import toast from 'react-hot-toast';

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      queryClient.invalidateQueries({ queryKey: ['favoriteLinks'] });
      if (data.isFavorite) {
        toast.success('즐겨찾기에 추가되었습니다!');
      } else {
        toast('즐겨찾기에서 제거되었습니다.', { icon: '🗑️' });
      }
    },
    onError: () => {
      toast.error('즐겨찾기 변경에 실패했습니다.');
    },
  });
}
