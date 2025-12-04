import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createErrorResponse } from '@/lib/api/handle-error';
import { UpdateCardImageResDto } from '@/lib/api/validations/columns';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const form = await req.formData();
    const file = form.get('image');

    if (!(file instanceof File)) {
      throw new Error('No image file provided');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please upload an image.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds the 5MB limit.');
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      throw new Error('No access token found');
    }

    // 새로운 FormData 생성
    const uploadForm = new FormData();
    uploadForm.append('image', file);

    console.log('Uploading to:', `${process.env.API_BASE_URL}/users/me/image`);

    const res = await fetch(`${process.env.API_BASE_URL}/users/me/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: uploadForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Upload API error:', res.status, errorText);
      throw new Error(`Upload failed: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    const validatedData = UpdateCardImageResDto.parse(data);

    return NextResponse.json(validatedData);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
