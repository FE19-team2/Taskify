import { createRequester, FetchClient } from '../request-core';
import { cookies } from 'next/headers';
import 'server-only';

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL이 설정되지 않았습니다.');
}
const request = createRequester({
  baseUrl: API_BASE_URL,
  getToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
  },
});

export const BEclient: FetchClient = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};
