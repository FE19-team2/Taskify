import { z } from 'zod';
import { Id, URL, Nickname } from './common';
// 댓글 유효성 검사 스키마
const Content = z.string().min(1).max(512);

export const AuthorSchema = z.object({
  profileImageUrl: URL,
  nickname: Nickname,
  id: Id,
});

export const CommentsSchema = z.object({
  content: Content,
  cardId: Id,
  columnId: Id,
  dashboardId: Id,
});

// 댓글 생성 요청 및 응답 DTO
export const createCommentReqDto = CommentsSchema;

export const createCommentResDto = z.object({
  id: Id,
  content: Content,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
  cardId: Id,
  author: AuthorSchema,
});

export type CreateCommentRequest = z.infer<typeof createCommentReqDto>;
export type CreateCommentResponse = z.infer<typeof createCommentResDto>;

export type CommentDto = CreateCommentResponse;

// 댓글 조회 쿼리 DTO
export const getCommentsQueryDto = z.object({
  cardId: z.coerce.number().int().positive(),
  size: z.coerce.number().int().positive().default(10).optional(),
  cursorId: z
    .union([z.coerce.number().int().positive(), z.literal(''), z.null(), z.undefined()])
    .optional()
    .transform((val) => (val === '' || val === null || val === undefined ? undefined : val)),
});

export type GetCommentsQuery = z.input<typeof getCommentsQueryDto>;

// 댓글 조회 응답 DTO
export const getCommentsResDto = z.object({
  cursorId: Id.nullable(),
  comments: z.array(createCommentResDto),
});

export type GetCommentsResponse = z.infer<typeof getCommentsResDto>;

// 댓글 수정 요청 및 응답 DTO
export const updateCommentReqDto = z.object({
  content: Content,
});

export const updateCommentResDto = createCommentResDto;

export type UpdateCommentResponse = z.infer<typeof updateCommentResDto>;
export type UpdateCommentRequest = z.infer<typeof updateCommentReqDto>;
