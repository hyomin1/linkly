import { useQuery } from '@tanstack/react-query';
import type { Category } from '../../links/types/link';
import { getCategories } from '../api/categoryApi';

export function useGetCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
