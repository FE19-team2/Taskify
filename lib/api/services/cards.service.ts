import { Client } from '../client/api-client';
import { GetCommentsResponse, getCommentsResDto } from '../validations/comments';
import {
  createCardReqDto,
  createCardResDto,
  CreateCardRequest,
  CreateCardResponse,
  getCardsQueryDto,
  GetCardsResponse,
  GetCardsQuery,
  getCardsResDto,
  updateCardReqDto,
  updateCardResDto,
  UpdateCardRequest,
  UpdateCardResponse,
  getCardByIdResDto,
  getCardByIdResponse,
} from '../validations/cards';

// 카드 생성 서비스
export async function createCard(cardData: CreateCardRequest): Promise<CreateCardResponse> {
  const validatedData = createCardReqDto.parse(cardData);
  const res = await Client.post<CreateCardResponse, CreateCardRequest>('/cards', validatedData);
  return createCardResDto.parse(res);
}

// 카드 조회 서비스
export async function getCard(params: GetCardsQuery): Promise<GetCardsResponse> {
  const validParams = getCardsQueryDto.parse(params);
  const { columnId, size, cursorId } = validParams;
  const query = new URLSearchParams({
    columnId: String(columnId),
    ...(size && { size: String(size) }),
    ...(cursorId && { cursorId: String(cursorId) }),
  });
  const res = await Client.get<GetCardsResponse>(`/cards?${query}`);
  return getCardsResDto.parse(res);
}

// 카드 수정 서비스
export async function updateCard(
  cardId: number,
  cardData: UpdateCardRequest,
): Promise<UpdateCardResponse> {
  const validatedData = updateCardReqDto.parse(cardData);
  const res = await Client.put<UpdateCardResponse, UpdateCardRequest>(
    `/cards/${cardId}`,
    validatedData,
  );
  return updateCardResDto.parse(res);
}

// 카드 상세 조회 서비스 (댓글 포함)
export async function getCardById(
  cardId: number,
): Promise<{ card: getCardByIdResponse; comments: GetCommentsResponse }> {
  const cardRes = await Client.get<getCardByIdResponse>(`/cards/${cardId}`);
  const commentRes = await Client.get<GetCommentsResponse>(`/comments?size=10&cardId=${cardId}`);

  const validCard = getCardByIdResDto.parse(cardRes);
  const validComments = getCommentsResDto.parse(commentRes);

  return { card: validCard, comments: validComments };
}

// 카드 삭제 서비스
export async function deleteCard(cardId: number): Promise<void> {
  await Client.delete<void>(`/cards/${cardId}`);
}
