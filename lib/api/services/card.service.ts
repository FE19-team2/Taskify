import { Client } from '../api-client';
import {
  createCardReqDto,
  createCardResDto,
  CreateCardRequest,
  CreateCardResponse,
} from '../validations/card';

export async function createCard(cardData: CreateCardRequest): Promise<CreateCardResponse> {
  const validatedData = createCardReqDto.parse(cardData);
  const res = await Client.post<CreateCardResponse, CreateCardRequest>('/cards', validatedData);
  return createCardResDto.parse(res);
}
