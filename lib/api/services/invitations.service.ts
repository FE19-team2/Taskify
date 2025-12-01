import { Client } from '@/lib/api/client/api-client';
import {
  getInvitationsQueryDto,
  GetInvitationsQuery,
  getInvitationsResDto,
  GetInvitationsResponse,
  respondInvitationResDto,
  RespondInvitationResponse,
} from '@/lib/api/validations/invitations';

export async function getInvitations(params: GetInvitationsQuery): Promise<GetInvitationsResponse> {
  const validParams = getInvitationsQueryDto.parse(params);
  const query = new URLSearchParams({
    ...(validParams.cursorId && { cursorId: String(validParams.cursorId) }),
    ...(validParams.size && { size: String(validParams.size) }),
    ...(validParams.title && { title: String(validParams.title) }),
  });
  const res = await Client.get<GetInvitationsResponse>(`/invitations?${query.toString()}`);
  return getInvitationsResDto.parse(res);
}

async function respondInvitation(
  invitationId: number,
  inviteAccepted: boolean,
): Promise<RespondInvitationResponse> {
  const body = { inviteAccepted };
  const res = await Client.put<RespondInvitationResponse, typeof body>(
    `/invitations/${invitationId}`,
    body,
  );
  return respondInvitationResDto.parse(res);
}

export async function acceptInvitation(invitationId: number): Promise<RespondInvitationResponse> {
  return respondInvitation(invitationId, true);
}

export async function declineInvitation(invitationId: number): Promise<RespondInvitationResponse> {
  return respondInvitation(invitationId, false);
}
