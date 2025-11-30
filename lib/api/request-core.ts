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

    if (res.ok) {
      const data = await res.json();
      return data as T;
    } else {
      try {
        const errorData = await res.json();
        const errorMessage = errorData?.message || res.statusText;
        throw new HttpError(res.status, errorMessage);
      } catch {
        throw new HttpError(res.status, res.statusText);
      }
    }
  };
}
