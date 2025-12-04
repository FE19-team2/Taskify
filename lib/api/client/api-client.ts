import { createRequester, FetchClient } from '../request-core';

const request = createRequester({
  baseUrl: '/api',
});

export const Client: FetchClient = {
  get: (path) => {
    return request('GET', path);
  },
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};
