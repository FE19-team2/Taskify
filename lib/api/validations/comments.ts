import { z } from 'zod';

// 댓글 유효성 검사 스키마
export const Content = z.string().min(1).max(512);
export const Id = z.number().int().positive();
export const Url = z.url().or(z.null());

export const AuthorSchema = z.object({
  profileImageUrl: Url,
  nickname: z.string().min(2).max(16),
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
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  cardId: Id,
  author: AuthorSchema,
});

// 타입 추출
export type CreateCommentRequest = z.infer<typeof createCommentReqDto>;
export type CreateCommentResponse = z.infer<typeof createCommentResDto>;

// 댓글 조회 쿼리 DTO
export const getCommentsQueryDto = z.object({
  cardId: z.coerce.number().int().positive(),
  size: z.coerce.number().int().nonnegative().default(10),
  cursorId: z.coerce.number().int().positive().optional(),
});

// 타입 추출
export type GetCommentsQuery = z.infer<typeof getCommentsQueryDto>;

// 댓글 조회 응답 DTO
export const getCommentsResDto = z.object({
  cursorId: Id.nullable(),
  comments: z.array(createCommentResDto),
});

// 타입 추출
export type GetCommentsResponse = z.infer<typeof getCommentsResDto>;

// 댓글 수정 요청 및 응답 DTO
export const editCommentReqDto = z.object({
  content: Content,
});

export const editCommentResDto = createCommentResDto;

// 타입 추출
export type EditCommentResponse = z.infer<typeof editCommentResDto>;
export type EditCommentRequest = z.infer<typeof editCommentReqDto>;
