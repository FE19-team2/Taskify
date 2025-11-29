import { Client } from '../client/api-client';
import {
  GetDashboardsResponse,
  getDashboardsResDto,
  GetDashboardsQuery,
  getDashboardsQueryDto,
  CreateDashboardRequest,
  CreateDashboardResponse,
  createDashboardReqDto,
  createDashboardResDto,
  GetDashboardByIdResponse,
  getDashboardByIdResDto,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  updateDashboardReqDto,
  updateDashboardResDto,
  getDashboardInvitationsResDto,
  GetDashboardInvitationsResponse,
  getDashboardInvitationsQueryDto,
  GetDashboardInvitationsQuery,
  sendDashboardInvitationReqDto,
  SendDashboardInvitationRequest,
  SendDashboardInvitationResponse,
  sendDashboardInvitationResDto,
} from '../validations/dashboards';

export async function getDashboards(params: GetDashboardsQuery): Promise<GetDashboardsResponse> {
  const validParams = getDashboardsQueryDto.parse(params);
  const { size, cursorId } = validParams;
  const query = new URLSearchParams({
    ...(size && { size: String(size) }),
    ...(cursorId && { cursorId: String(cursorId) }),
  });
  const res = await Client.get<GetDashboardsResponse>(`/dashboards?${query.toString()}`);
  return getDashboardsResDto.parse(res);
}

export async function createDashboard(dashboardData: CreateDashboardRequest) {
  const validatedData = createDashboardReqDto.parse(dashboardData);
  const res = await Client.post<CreateDashboardResponse, CreateDashboardRequest>(
    '/dashboards',
    validatedData,
  );
  return createDashboardResDto.parse(res);
}

export async function getDashboardById(dashboardId: number) {
  const res = await Client.get<GetDashboardByIdResponse>(`/dashboards/${dashboardId}`);
  return getDashboardByIdResDto.parse(res);
}

export async function updateDashboard(dashboardId: number, dashboardData: UpdateDashboardRequest) {
  const res = await Client.put<UpdateDashboardResponse, UpdateDashboardRequest>(
    `/dashboards/${dashboardId}`,
    updateDashboardReqDto.parse(dashboardData),
  );
  return updateDashboardResDto.parse(res);
}

export async function deleteDashboard(dashboardId: number): Promise<void> {
  await Client.delete<void>(`/dashboards/${dashboardId}`);
}

export async function getDashboardInvitations(
  dashboardId: number,
  params: GetDashboardInvitationsQuery,
): Promise<GetDashboardInvitationsResponse> {
  const validParams = getDashboardInvitationsQueryDto.parse(params);
  const { page, size } = validParams;
  const query = new URLSearchParams({
    size: String(size),
    page: String(page),
  });
  const res = await Client.get<GetDashboardInvitationsResponse>(
    `/dashboards/${dashboardId}/invitations?${query.toString()}`,
  );
  return getDashboardInvitationsResDto.parse(res);
}

export async function sendDashboardInvitation(
  dashboardId: number,
  invitationData: SendDashboardInvitationRequest,
) {
  const validatedData = sendDashboardInvitationReqDto.parse(invitationData);
  const res = await Client.post<SendDashboardInvitationResponse, SendDashboardInvitationRequest>(
    `/dashboards/${dashboardId}/invitations`,
    validatedData,
  );
  return sendDashboardInvitationResDto.parse(res);
}

export async function revokeDashboardInvitation(
  dashboardId: number,
  invitationId: number,
): Promise<void> {
  await Client.delete<void>(`/dashboards/${dashboardId}/invitations/${invitationId}`);
}
