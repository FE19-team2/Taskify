import { z } from 'zod';

// 카드 유효성 검사 스키마
export const Id = z.number().int().positive();
export const Title = z.string().min(1).max(16);
export const Description = z.string().max(256);
export const dueDate = z.iso.datetime({ offset: true }).or(z.literal(''));
export const Tags = z.array(z.string().min(1).max(12)).max(10);
export const URL = z.url().or(z.literal(''));

// 카드 담당자 스키마
export const CardAssigneeSchema = z.object({
  profileImageUrl: URL,
  nickname: z.string(),
  id: Id,
});

// 카드 기본 요청 DTO
export const defaultCardReqDto = z.object({
  columnId: Id,
  assigneeUserId: Id,
  title: Title,
  description: Description,
  dueDate: dueDate,
  tags: Tags,
  imageUrl: URL,
});

export const defaultCardResDto = z.object({
  id: Id,
  title: Title,
  description: Description,
  tags: Tags,
  dueDate: dueDate,
  assignee: CardAssigneeSchema,
  imageUrl: URL,
  teamId: z.string(),
  columnId: Id,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// 카드 생성 요청 및 응답 DTO
export const createCardReqDto = defaultCardReqDto.extend({ dashboardId: Id });
export const createCardResDto = defaultCardResDto;

// 타입 추출
export type CreateCardRequest = z.infer<typeof createCardReqDto>;
export type CreateCardResponse = z.infer<typeof createCardResDto>;

// 카드 조회 쿼리 DTO
export const getCardsQueryDto = z.object({
  columnId: Id,
  size: z.number().int().nonnegative().optional(),
  cursorId: Id.optional(),
});

// 타입 추출
export type GetCardsQuery = z.infer<typeof getCardsQueryDto>;

// 카드 조회 요청 DTO
export const getCardsResDto = z.object({
  cursorId: Id,
  totalCount: z.number().int().positive(),
  cards: z.array(defaultCardResDto),
});

// 타입 추출
export type getCardsResponse = z.infer<typeof getCardsResDto>;

// 카드 수정 요청 및 응답 DTO
export const editCardReqDto = defaultCardReqDto;
export const editCardResDto = defaultCardResDto;

// 타입 추출
export type EditCardRequest = z.infer<typeof editCardReqDto>;
export type EditCardResponse = z.infer<typeof editCardResDto>;

// 카드 상세 조회 응답 DTO
export const getCardDetailResDto = defaultCardResDto;

// 타입 추출
export type GetCardDetailResponse = z.infer<typeof getCardDetailResDto>;
