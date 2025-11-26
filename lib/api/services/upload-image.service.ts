import { HttpError } from '@/lib/api/request-core';

export type UploadImageParams = {
  columnId: number;
  file: File;
};

export type UploadImageResponse = {
  imageUrl: string;
};

export async function uploadImage(params: UploadImageParams): Promise<UploadImageResponse> {
  const { columnId, file } = params;

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`/api/columns/${columnId}/card-image`, {
    method: 'POST',
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    return data as UploadImageResponse;
  } else {
    try {
      const errorData = await res.json();
      const errorMessage = errorData?.message || res.statusText;
      throw new HttpError(res.status, errorMessage);
    } catch {
      throw new HttpError(res.status, res.statusText);
    }
  }
}
