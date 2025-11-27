import { Client } from '@/lib/api/client/api-client';
import {
  getDashboardMembersQueryDto,
  GetDashboardMembersQuery,
  GetDashboardMembersResponse,
  getDashboardMembersResDto,
} from '@/lib/api/validations/members';

export async function getDashboardMembers(
  params: GetDashboardMembersQuery,
): Promise<GetDashboardMembersResponse> {
  const validParams = getDashboardMembersQueryDto.parse(params);
  const { page, size, dashboardId } = validParams;
  const query = new URLSearchParams({
    ...(page && { page: String(page) }),
    ...(size && { size: String(size) }),
    dashboardId: String(dashboardId),
  });
  const res = await Client.get<GetDashboardMembersResponse>(`/members?${query.toString()}`);
  return getDashboardMembersResDto.parse(res);
}
