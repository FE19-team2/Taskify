import { Client } from '../client/api-client';
import {
  createCommentReqDto,
  createCommentResDto,
  getCommentsQueryDto,
  getCommentsResDto,
  updateCommentReqDto,
  updateCommentResDto,
} from '@/lib/api/validations/comments';
import type {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsQuery,
  GetCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from '@/lib/api/validations/comments';

export async function createComment(
  commentData: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const validatedData = createCommentReqDto.parse(commentData);
  const res = await Client.post<CreateCommentResponse, CreateCommentRequest>(
    '/comments',
    validatedData,
  );
  return createCommentResDto.parse(res);
}

export async function getComments(params: GetCommentsQuery): Promise<GetCommentsResponse> {
  const validParams = getCommentsQueryDto.parse(params);
  const { cardId, size, cursorId } = validParams;
  const query = new URLSearchParams({
    ...(cursorId ? { cursorId: String(cursorId) } : {}),
    cardId: String(cardId),
    size: String(size),
  });
  const res = await Client.get<GetCommentsResponse>(`/comments?${query}`);
  return getCommentsResDto.parse(res);
}

export async function updateComment(
  commentId: number,
  commentData: UpdateCommentRequest,
): Promise<UpdateCommentResponse> {
  const validatedData = updateCommentReqDto.parse(commentData);
  const res = await Client.put<UpdateCommentResponse, UpdateCommentRequest>(
    `/comments/${commentId}`,
    validatedData,
  );
  return updateCommentResDto.parse(res);
}

export async function deleteComment(commentId: number): Promise<void> {
  await Client.delete<void>(`/comments/${commentId}`);
}
