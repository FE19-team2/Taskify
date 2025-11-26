import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  editCommentReqDto,
  editCommentResDto,
  EditCommentRequest,
  EditCommentResponse,
} from '@/lib/api/validations/comments';

export async function PUT(
  req: NextRequest,
  { params }: { params: { commentId: string } },
): Promise<NextResponse<EditCommentResponse | { message: string }>> {
  try {
    const body = await req.json();
    const validatedData = editCommentReqDto.parse(body);
    const { commentId } = params;

    const backendRes = await BEclient.put<EditCommentResponse, EditCommentRequest>(
      `/comments/${commentId}`,
      validatedData,
    );
    const data = editCommentResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } },
): Promise<Response | NextResponse<{ message: string }>> {
  try {
    const { commentId } = params;
    await BEclient.delete(`/comments/${commentId}`);

    return new Response(null, { status: 204 });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
