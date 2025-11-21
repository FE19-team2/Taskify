const BASE_URL = 'https://sp-taskify-api.vercel.app/FE19-2team/';
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

type Primitive = string | number | boolean | null | undefined;

export type QueryParams = Record<string, Primitive>;
export type Json = Record<string, unknown> | unknown[];

export type PutAndPostMethod = <T, B>(path: string, body: B) => Promise<T | void>;
export type GetAndDeleteMethod = <T>(path: string) => Promise<T | void>;
export type PostMethod = PutAndPostMethod;
export type PutMethod = PutAndPostMethod;
export type GetMethod = GetAndDeleteMethod;
export type DeleteMethod = GetAndDeleteMethod;
export interface HttpErrorPayload {
  status: number;
  data: { message: string };
}

export type FetchClient = {
  get: GetMethod;
  post: PostMethod;
  put: PutMethod;
  delete: DeleteMethod;
};

export function createHttpError(status: number, message: string): Error & HttpErrorPayload {
  const err = new Error(message) as Error & HttpErrorPayload;
  Object.assign(err, { status, data: { message } });
  return err;
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

  const data = await res.json();
  if (!res.ok) throw createHttpError(res.status, data.message);

  return data;
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
