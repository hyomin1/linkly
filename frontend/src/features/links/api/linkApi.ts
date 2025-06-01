import apiClient from '../../../lib/apiClient';

interface Link {
  url: string;
  title: string;
}

export async function createLink(link: Link) {
  const response = await apiClient.post('/links', link);
  return response.data;
}

export async function getLinks() {
  const response = await apiClient.get('/links');
  return response.data;
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
