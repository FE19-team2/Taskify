export const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

export type PutAndPostMethod = <T, B>(path: string, body: B) => Promise<T | void>;
export type GetAndDeleteMethod = <T>(path: string) => Promise<T | void>;
export type FetchClient = {
  get: GetAndDeleteMethod;
  post: PutAndPostMethod;
  put: PutAndPostMethod;
  delete: GetAndDeleteMethod;
};

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type CreateRequesterOptions = {
  baseUrl: string;
  getToken?: () => Promise<string | undefined>;
};

export function createRequester({ baseUrl, getToken }: CreateRequesterOptions) {
  return async function request<T, B>(method: Method, path: string, body?: B): Promise<T | void> {
    const token = getToken ? await getToken() : undefined;

    const headers: Record<string, string> = {
      ...DEFAULT_HEADERS,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const init: RequestInit = {
      method,
      headers,
    };

    if (body !== undefined) init.body = JSON.stringify(body);

    const res = await fetch(baseUrl + path, init);
    if (res.status === 204) return;

    const text = await res.text();

    if (!res.ok) {
      let message = res.statusText;
      try {
        const json = JSON.parse(text);
        if (typeof json.message === 'string' && json.message.trim()) {
          message = json.message;
        }
        return json as T;
      } catch {
        if (text.trim()) {
          message = text;
        }
      }
      throw new HttpError(res.status, message);
    }
  };
}
