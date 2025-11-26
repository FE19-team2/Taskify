import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse } from '@/lib/api/handle-error';
import { BEclient } from '@/lib/api/server/api-client';
import {
  editColumnReqDto,
  editColumnResDto,
  EditColumnRequest,
  EditColumnResponse,
} from '@/lib/api/validations/columns';

export async function PUT(
  req: NextRequest,
  { params }: { params: { columnId: string } },
): Promise<NextResponse<EditColumnResponse | { message: string }>> {
  try {
    const body = await req.json();
    const validatedData = editColumnReqDto.parse(body);
    const { columnId } = params;

    const backendRes = await BEclient.put<EditColumnResponse, EditColumnRequest>(
      `/columns/${columnId}`,
      validatedData,
    );
    const data = editColumnResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { columnId: string } },
): Promise<Response | NextResponse<{ message: string }>> {
  try {
    const { columnId } = params;
    await BEclient.delete<void>(`/columns/${columnId}`);

    return new Response(null, { status: 204 });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
