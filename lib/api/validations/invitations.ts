import { z } from 'zod';
import { Id, Title } from './common';
import { sendDashboardInvitationResDto } from './dashboards';

// 초대장 조회 쿼리 DTO
export const getInvitationsQueryDto = z.object({
  cursorId: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().nonnegative().default(10),
  title: Title.optional(),
});

export type GetInvitationsQuery = z.infer<typeof getInvitationsQueryDto>;

// 초대장 조회 응답 DTO
export const getInvitationsResDto = z.object({
  cursorId: Id.nullable(),
  invitations: z.array(sendDashboardInvitationResDto),
});

export type GetInvitationsResponse = z.infer<typeof getInvitationsResDto>;

// 초대장 응답 DTO
export const respondInvitationReqDto = z.object({
  inviteAccepted: z.boolean(),
});

export const respondInvitationResDto = sendDashboardInvitationResDto;

export type RespondInvitationRequest = z.infer<typeof respondInvitationReqDto>;
export type RespondInvitationResponse = z.infer<typeof respondInvitationResDto>;
