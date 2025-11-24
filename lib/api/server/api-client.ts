import { createRequester, FetchClient } from '../request-core';
import { cookies } from 'next/headers';

const request = createRequester({
  baseUrl: process.env.API_BASE_URL!,
  getToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
  },
});

export const Client: FetchClient = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};
