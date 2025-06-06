import apiClient from '../../../lib/apiClient';
import type { Category } from '../../links/types/link';

export async function createCategory(link: Pick<Category, 'name'>) {
  const { data } = await apiClient.post('/categories', link);
  return data;
}

export async function getCategories() {
  const { data } = await apiClient.get('/categories');
  return data;
}

export async function deleteCategory(id: number) {
  return await apiClient.delete(`/categories/${id}`);
}

export async function updateCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const { data } = await apiClient.patch(`/categories/${id}`, {
    name,
  });
  return data;
}
