import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '../api/linkApi';

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLink,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
}
