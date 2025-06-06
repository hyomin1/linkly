import { useQuery } from '@tanstack/react-query';
import { getLinks } from '../api/linkApi';
import type { Link } from '../types/link';

export function useGetLinks() {
  return useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: getLinks,
  });
}
