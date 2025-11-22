const BASE_URL = 'https://sp-taskify-api.vercel.app/FE19-2team/';
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

export type PutAndPostMethod = <T, B>(path: string, body: B) => Promise<T | void>;
export type GetAndDeleteMethod = <T>(path: string) => Promise<T | void>;

export type FetchClient = {
  get: GetAndDeleteMethod;
  post: PutAndPostMethod;
  put: PutAndPostMethod;
  delete: GetAndDeleteMethod;
};
export class HttpError extends Error {
  public data: { message: string };
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
    this.data = { message };
  }
}

export async function request<T, B>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: B,
): Promise<T | void> {
  const init: RequestInit = {
    method,
    headers: DEFAULT_HEADERS,
  };

  if (body !== undefined) init.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + path, init);
  if (res.status === 204) return;

  const text = await res.text();

  if (!res.ok) {
    let message = res.statusText;
    try {
      const json = JSON.parse(text);
      message = json.message || json.error || text || res.statusText;
    } catch {
      message = text || res.statusText;
    }
    throw new HttpError(res.status, message);
  }

  return JSON.parse(text) as T;
}

export const Client: FetchClient = {
  async get(path) {
    return request('GET', path);
  },
  async post(path, body) {
    return request('POST', path, body);
  },
  async put(path, body) {
    return request('PUT', path, body);
  },
  async delete(path) {
    return request('DELETE', path);
  },
};
