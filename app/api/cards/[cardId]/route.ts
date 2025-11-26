import { NextResponse } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  editCardReqDto,
  editCardResDto,
  EditCardRequest,
  EditCardResponse,
  getCardDetailResDto,
  GetCardDetailResponse,
} from '@/lib/api/validations/cards';
import { getCommentsResDto, GetCommentsResponse } from '@/lib/api/validations/comments';

export async function PUT(req: Request, { params }: { params: { cardId: string } }) {
  try {
    const body = await req.json();
    const validatedData = editCardReqDto.parse(body);
    const { cardId } = params;

    const backendRes = await BEclient.put<EditCardResponse, EditCardRequest>(
      `/cards/${cardId}`,
      validatedData,
    );
    const data = editCardResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(_: Request, { params }: { params: { cardId: string } }) {
  try {
    const { cardId } = params;
    const cardRes = await BEclient.get<GetCardDetailResponse>(`/cards/${cardId}`);
    const commentRes = await BEclient.get<GetCommentsResponse>(
      `/comments?size=10&cardId=${cardId}`,
    );

    const validCard = getCardDetailResDto.parse(cardRes);
    const validComments = getCommentsResDto.parse(commentRes);

    return NextResponse.json({ card: validCard, comments: validComments });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function DELETE(_: Request, { params }: { params: { cardId: string } }) {
  try {
    const { cardId } = params;
    await BEclient.delete<void>(`/cards/${cardId}`);

    return new Response(null, { status: 204 });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
