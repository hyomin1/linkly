import { useQuery } from '@tanstack/react-query';
import { getFavoriteLinks } from '../api/linkApi';
import type { Link } from '../types/link';

export function useFavoriteLinks() {
  return useQuery<Link[]>({
    queryKey: ['favoriteLinks'],
    queryFn: getFavoriteLinks,
  });
}
