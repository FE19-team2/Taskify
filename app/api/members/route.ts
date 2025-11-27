import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  getDashboardMembersQueryDto,
  GetDashboardMembersResponse,
  getDashboardMembersResDto,
} from '@/lib/api/validations/members';

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const raw = {
      page: searchParams.get('page'),
      size: searchParams.get('size'),
      dashboardId: searchParams.get('dashboardId'),
    };
    const validatedQuery = getDashboardMembersQueryDto.parse(raw);
    const query = new URLSearchParams({
      ...(validatedQuery.page && { page: String(validatedQuery.page) }),
      ...(validatedQuery.size && { size: String(validatedQuery.size) }),
      dashboardId: String(validatedQuery.dashboardId),
    });
    const backendRes = await BEclient.get<GetDashboardMembersResponse>(
      `/members?${query.toString()}`,
    );
    const data = getDashboardMembersResDto.parse(backendRes);
    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
