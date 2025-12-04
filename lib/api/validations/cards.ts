import { z } from 'zod';
import { Id, Nickname, Title, URL, ISODateTime } from './common';

export const Description = z.string().max(256);
export const Tags = z.array(z.string().min(1).max(12)).max(10);

// 카드 담당자 스키마
export const CardAssigneeSchema = z.object({
  profileImageUrl: URL,
  nickname: Nickname,
  id: Id,
});

// 카드 기본 요청 DTO
export const defaultCardReqDto = z.object({
  columnId: Id,
  assigneeUserId: Id.optional(),
  title: Title,
  description: Description,
  dueDate: ISODateTime.optional(),
  tags: Tags.optional().default([]),
  imageUrl: URL.optional(),
});

export const defaultCardResDto = z.object({
  id: Id,
  title: Title,
  description: Description,
  tags: Tags,
  dueDate: ISODateTime,
  assignee: CardAssigneeSchema.nullable(),
  imageUrl: URL,
  teamId: z.string(),
  columnId: Id,
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

export type CardDto = z.infer<typeof defaultCardResDto>;

// 카드 생성 요청 및 응답 DTO
export const createCardReqDto = defaultCardReqDto.extend({ dashboardId: Id });
export const createCardResDto = defaultCardResDto;

// 타입 추출
export type CreateCardRequest = z.infer<typeof createCardReqDto>;
export type CreateCardResponse = z.infer<typeof createCardResDto>;

// 카드 조회 쿼리 DTO
export const getCardsQueryDto = z.object({
  columnId: z.coerce.number().int().positive(),
  size: z.coerce.number().int().nonnegative().default(10).optional(),
  cursorId: z
    .union([z.coerce.number().int().positive(), z.literal(''), z.null(), z.undefined()])
    .optional()
    .transform((val) => (val === '' || val === null || val === undefined ? undefined : val)),
});

export type GetCardsQuery = z.input<typeof getCardsQueryDto>;

// 카드 조회 요청 DTO
export const getCardsResDto = z.object({
  cursorId: Id.nullable(),
  totalCount: z.number().int().nonnegative(),
  cards: z.array(defaultCardResDto),
});

export type GetCardsResponse = z.infer<typeof getCardsResDto>;

// 카드 수정 요청 및 응답 DTO
export const updateCardReqDto = defaultCardReqDto;
export const updateCardResDto = defaultCardResDto;

export type UpdateCardRequest = z.infer<typeof updateCardReqDto>;
export type UpdateCardResponse = z.infer<typeof updateCardResDto>;

// 카드 상세 조회 응답 DTO
export const getCardByIdResDto = defaultCardResDto;

export type getCardByIdResponse = z.infer<typeof getCardByIdResDto>;
