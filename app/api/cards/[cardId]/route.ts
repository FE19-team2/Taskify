import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  updateCardReqDto,
  updateCardResDto,
  UpdateCardRequest,
  UpdateCardResponse,
  getCardByIdResDto,
  getCardByIdResponse,
} from '@/lib/api/validations/cards';
import { getCommentsResDto, GetCommentsResponse } from '@/lib/api/validations/comments';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = updateCardReqDto.parse(body);
    const { cardId } = await params;

    const backendRes = await BEclient.put<UpdateCardResponse, UpdateCardRequest>(
      `/cards/${cardId}`,
      validatedData,
    );
    const data = updateCardResDto.parse(backendRes);
    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
): Promise<Response> {
  try {
    const { cardId } = await params;
    const cardRes = await BEclient.get<getCardByIdResponse>(`/cards/${cardId}`);
    const commentRes = await BEclient.get<GetCommentsResponse>(
      `/comments?size=10&cardId=${cardId}`,
    );

    const validCard = getCardByIdResDto.parse(cardRes);
    const validComments = getCommentsResDto.parse(commentRes);

    return NextResponse.json({ card: validCard, comments: validComments });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
): Promise<Response> {
  try {
    const { cardId } = await params;
    await BEclient.delete<void>(`/cards/${cardId}`);

    return new Response(null, { status: 204 });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
