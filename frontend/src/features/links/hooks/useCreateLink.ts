import { useMutation } from '@tanstack/react-query';
import { createLink } from '../api/linkApi';

export function useCreateLink() {
  return useMutation({
    mutationFn: createLink,
  });
}
