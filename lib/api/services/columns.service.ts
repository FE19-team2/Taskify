import { Client } from '../client/api-client';
import {
  createColumnReqDto,
  createColumnResDto,
  CreateColumnRequest,
  CreateColumnResponse,
  getColumnsResDto,
  GetColumnsResponse,
  editColumnReqDto,
  editColumnResDto,
  EditColumnRequest,
  EditColumnResponse,
  GetColumnsQuery,
  getColumnsQueryDto,
} from '@/lib/api/validations/columns';

export async function getColumns(params: GetColumnsQuery): Promise<GetColumnsResponse> {
  const validParams = getColumnsQueryDto.parse(params);
  const { cardId, size, cursorId } = validParams;
  const query = new URLSearchParams({
    cardId: String(cardId),
    ...(size && { size: String(size) }),
    ...(cursorId && { cursorId: String(cursorId) }),
  });
  const res = await Client.get<GetColumnsResponse>(`/columns?${query}`);
  return getColumnsResDto.parse(res);
}

export async function createColumn(columnData: CreateColumnRequest): Promise<CreateColumnResponse> {
  const validatedData = createColumnReqDto.parse(columnData);
  const res = await Client.post<CreateColumnResponse, CreateColumnRequest>(
    '/columns',
    validatedData,
  );
  return createColumnResDto.parse(res);
}

export async function updateColumn(
  columnId: number,
  columnData: EditColumnRequest,
): Promise<EditColumnResponse> {
  const validatedData = editColumnReqDto.parse(columnData);
  const res = await Client.put<EditColumnResponse, EditColumnRequest>(
    `/columns/${columnId}`,
    validatedData,
  );
  return editColumnResDto.parse(res);
}

export async function deleteColumn(columnId: number): Promise<void> {
  await Client.delete<void>(`/columns/${columnId}`);
}
