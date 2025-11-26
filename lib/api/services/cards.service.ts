import { Client } from '../client/api-client';
import { GetCommentsResponse, getCommentsResDto } from '../validations/comments';
import {
  createCardReqDto,
  createCardResDto,
  CreateCardRequest,
  CreateCardResponse,
  getCardsQueryDto,
  getCardsResponse,
  GetCardsQuery,
  getCardsResDto,
  editCardReqDto,
  editCardResDto,
  EditCardRequest,
  EditCardResponse,
  getCardDetailResDto,
  GetCardDetailResponse,
} from '../validations/cards';

// 카드 생성 서비스
export async function createCard(cardData: CreateCardRequest): Promise<CreateCardResponse> {
  const validatedData = createCardReqDto.parse(cardData);
  const res = await Client.post<CreateCardResponse, CreateCardRequest>('/cards', validatedData);
  return createCardResDto.parse(res);
}

// 카드 조회 서비스
export async function getCard(params: GetCardsQuery): Promise<getCardsResponse> {
  const validParams = getCardsQueryDto.parse(params);
  const { columnId, size, cursorId } = validParams;
  const query = new URLSearchParams({
    columnId: String(columnId),
    ...(size && { size: String(size) }),
    ...(cursorId && { cursorId: String(cursorId) }),
  });
  const res = await Client.get<getCardsResponse>(`/cards?${query}`);
  return getCardsResDto.parse(res);
}

// 카드 수정 서비스
export async function editCard(
  cardId: number,
  cardData: EditCardRequest,
): Promise<EditCardResponse> {
  const validatedData = editCardReqDto.parse(cardData);
  const res = await Client.put<EditCardResponse, EditCardRequest>(
    `/cards/${cardId}`,
    validatedData,
  );
  return editCardResDto.parse(res);
}

// 카드 상세 조회 서비스 (댓글 포함)
export async function getCardDetail(
  cardId: number,
): Promise<{ card: GetCardDetailResponse; comments: GetCommentsResponse }> {
  const cardRes = await Client.get<GetCardDetailResponse>(`/cards/${cardId}`);
  const commentRes = await Client.get<GetCommentsResponse>(`/comments?size=10&cardId=${cardId}`);

  const validCard = getCardDetailResDto.parse(cardRes);
  const validComments = getCommentsResDto.parse(commentRes);

  return { card: validCard, comments: validComments };
}

// 카드 삭제 서비스
export async function deleteCard(cardId: number): Promise<void> {
  await Client.delete<void>(`/cards/${cardId}`);
}
