type Primitive = string | number | boolean | null | undefined;

export type QueryParams = Record<string, Primitive>;
export type Json = Record<string, unknown> | unknown[];

export type GetMethod = <T>(path: string, query?: QueryParams) => Promise<T>;

export type PutAndPostMethod = <T, B>(path: string, body: B) => Promise<T>;
export type PostMethod = PutAndPostMethod;
export type PutMethod = PutAndPostMethod;

export type DeleteMethod = <T>(path: string) => Promise<T>;

export interface FetchClientOptions {
  baseUrl: string;
}

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
