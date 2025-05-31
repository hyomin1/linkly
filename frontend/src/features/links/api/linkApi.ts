import apiClient from '../../../lib/apiClient';

interface Link {
  url: string;
}

export async function createLink(link: Link) {
  const response = await apiClient.post('/links', link);
  return response.data;
}
