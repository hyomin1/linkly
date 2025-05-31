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
