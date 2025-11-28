import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  createCommentReqDto,
  createCommentResDto,
  CreateCommentRequest,
  CreateCommentResponse,
  getCommentsResDto,
  GetCommentsResponse,
  getCommentsQueryDto,
} from '@/lib/api/validations/comments';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = createCommentReqDto.parse(body);

    const backendRes = await BEclient.post<CreateCommentResponse, CreateCommentRequest>(
      '/comments',
      validatedData,
    );
    const data = createCommentResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const raw = {
      cardId: searchParams.get('cardId'),
      size: searchParams.get('size'),
      cursorId: searchParams.get('cursorId'),
    };

    const validParams = getCommentsQueryDto.parse(raw);
    const query = new URLSearchParams({
      cardId: String(validParams.cardId),
      ...(validParams.size && { size: String(validParams.size) }),
      ...(validParams.cursorId && { cursorId: String(validParams.cursorId) }),
    });

    const backendRes = await BEclient.get<GetCommentsResponse>(`/comments?${query.toString()}`);
    const data = getCommentsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
