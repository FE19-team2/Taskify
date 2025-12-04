import { z } from 'zod';
import { sendDashboardInvitationResDto } from './dashboards';

// 초대장 조회 쿼리 DTO
export const getInvitationsQueryDto = z.object({
  cursorId: z.coerce.number().int().nonnegative().optional(),
  size: z.coerce.number().int().min(1).max(100).default(10),
  title: z.string().max(16).optional(),
});

export type GetInvitationsQuery = z.infer<typeof getInvitationsQueryDto>;

// 초대장 조회 응답 DTO
export const getInvitationsResDto = z.object({
  cursorId: z.number().int().nonnegative().nullable(),
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
