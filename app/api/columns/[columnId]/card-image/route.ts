import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createErrorResponse } from '@/lib/api/handle-error';
import { file } from 'zod';
import { UpdateCardImageResDto } from '@/lib/api/validations/columns';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ columnId: string }> },
): Promise<Response> {
  try {
    const { columnId } = await params;
    const form = await req.formData();

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

    const res = await fetch(`${process.env.API_BASE_URL}/columns/${columnId}/card-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    });

    const data = await res.json();
    const validatedData = UpdateCardImageResDto.parse(data);

    return NextResponse.json(validatedData);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
