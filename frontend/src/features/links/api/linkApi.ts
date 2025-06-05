import apiClient from '../../../lib/apiClient';
import type { Link } from '../../../types/link';

export async function createLink(link: Pick<Link, 'url'>) {
  const { data } = await apiClient.post('/links', link);
  return data;
}

export async function getLinks() {
  const { data } = await apiClient.get('/links');
  return data;
}

export async function deleteLink(id: number) {
  return await apiClient.delete(`/links/${id}`);
}

export async function updateLink({
  id,
  data,
}: {
  id: number;
  data: { title?: string; url?: string };
}) {
  const response = await apiClient.patch(`/links/${id}`, data);
  return response.data;
}

export async function toggleFavorite(id: number) {
  const { data } = await apiClient.patch(`/links/${id}/favorite`);
  return data;
}

export async function getFavoriteLinks() {
  const { data } = await apiClient.get('/links/favorite');
  return data;
}
