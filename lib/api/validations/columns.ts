import { z } from 'zod';
import { Id, Title, URL, ISODateTime } from './common';

// 칼럼 생성 요청 및 응답 DTO
export const createColumnReqDto = z.object({
  title: Title,
  dashboardId: Id,
});

export const createColumnResDto = z.object({
  id: Id,
  title: Title,
  teamId: z.string(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

export type CreateColumnRequest = z.infer<typeof createColumnReqDto>;
export type CreateColumnResponse = z.infer<typeof createColumnResDto>;

// 칼럼 조회 응답 DTO
export const getColumnsResDto = z.object({
  result: z.enum(['SUCCESS']),
  data: z.array(createColumnResDto),
});

export type GetColumnsResponse = z.infer<typeof getColumnsResDto>;

// 칼럼 수정 요청 및 응답 DTO
export const editColumnReqDto = z.object({
  title: Title,
});
export const editColumnResDto = createColumnResDto;

export type EditColumnResponse = z.infer<typeof editColumnResDto>;
export type EditColumnRequest = z.infer<typeof editColumnReqDto>;

// 칼럼 조회 쿼리 DTO
export const getColumnsQueryDto = z.object({
  cardId: z.coerce.number().int().positive(),
  size: z.coerce.number().int().nonnegative().default(10),
  cursorId: z.coerce.number().int().positive().optional(),
});

export type GetColumnsQuery = z.infer<typeof getColumnsQueryDto>;

// 카드 이미지 업데이트 응답 DTO
export const UpdateCardImageResDto = z.object({
  imageUrl: URL,
});

//  타입 추출
export type UpdateCardImageResponse = z.infer<typeof UpdateCardImageResDto>;
