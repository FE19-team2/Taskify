import { z } from 'zod';
import { Id, Title, ISODateTime, Email, Nickname } from './common';

const HexColor = z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/);

// 대시보드 생성 요청 및 응답 DTO
export const createDashboardReqDto = z.object({
  title: Title,
  color: HexColor,
});

export const createDashboardResDto = z.object({
  id: Id,
  title: Title,
  color: HexColor,
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
  createdByMe: z.boolean(),
  userId: Id,
});

export type CreateDashboardRequest = z.infer<typeof createDashboardReqDto>;
export type CreateDashboardResponse = z.infer<typeof createDashboardResDto>;

// 대시보드 조회 쿼리 DTO

export const getDashboardsQueryDto = z.object({
  cursorId: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().nonnegative().default(10),
});

// 대시보드 조회 응답 DTO
export const getDashboardsResDto = z.object({
  cursorId: Id.nullable(),
  totalCount: z.number().int().nonnegative(),
  dashboards: z.array(createDashboardResDto),
});

export type GetDashboardsResponse = z.infer<typeof getDashboardsResDto>;

// 대시보드 ID로 조회 요청 및 응답 DTO
export const getDashboardByIdResDto = createDashboardResDto;

export type GetDashboardByIdResponse = z.infer<typeof getDashboardByIdResDto>;

export const updateDashboardReqDto = z.object({
  title: Title,
  color: HexColor,
});

// 대시보드 수정 응답 DTO
export const updateDashboardResDto = createDashboardResDto;

export type UpdateDashboardRequest = z.infer<typeof updateDashboardReqDto>;
export type UpdateDashboardResponse = z.infer<typeof updateDashboardResDto>;

// 대시보드 초대장 관련 DTO
const Inviter = z.object({
  nickname: Nickname,
  email: Email,
  id: Id,
});

const Dashboard = z.object({
  title: Title,
  id: Id,
});

const Invitee = Inviter;

export const sendDashboardInvitationReqDto = z.object({
  email: Email,
});

export const sendDashboardInvitationResDto = z.object({
  id: Id,
  inviter: Inviter,
  teamId: z.string(),
  dashboard: Dashboard,
  invitee: Invitee,
  inviteAccepted: z.boolean().or(z.null()),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

export type SendDashboardInvitationRequest = z.infer<typeof sendDashboardInvitationReqDto>;
export type SendDashboardInvitationResponse = z.infer<typeof sendDashboardInvitationResDto>;

// 대시보드 초대장 조회 쿼리 DTO
export const getDashboardInvitationsQueryDto = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().nonnegative().default(10),
});

// 대시보드 초대장 조회 응답 DTO
export const getDashboardInvitationsResDto = z.object({
  totalCount: z.number().int().nonnegative(),
  invitations: z.array(sendDashboardInvitationResDto),
});

export type GetDashboardInvitationsResponse = z.infer<typeof getDashboardInvitationsResDto>;
