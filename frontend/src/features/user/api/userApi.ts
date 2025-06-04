import type { AxiosError } from 'axios';
import apiClient from '../../../lib/apiClient';

export async function fetchCurrentUser() {
  try {
    const { data } = await apiClient.get('/user/me');
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 401) {
      return null;
    }
  }
}
