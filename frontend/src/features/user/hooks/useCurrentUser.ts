import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../api/userApi';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
  });
}
