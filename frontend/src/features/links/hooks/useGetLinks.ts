import { useQuery } from '@tanstack/react-query';
import { getLinks } from '../api/linkApi';

export interface Link {
  id: number;
  url: string;
  title: string;
  createdAt: string;
}

export function useGetLinks() {
  return useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: getLinks,
  });
}
