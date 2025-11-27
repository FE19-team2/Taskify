import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  sendDashboardInvitationReqDto,
  sendDashboardInvitationResDto,
  SendDashboardInvitationRequest,
  SendDashboardInvitationResponse,
  getDashboardInvitationsResDto,
  GetDashboardInvitationsResponse,
  getDashboardInvitationsQueryDto,
} from '@/lib/api/validations/dashboards';

export async function POST(
  req: NextRequest,
  { params }: { params: { dashboardId: string } },
): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = sendDashboardInvitationReqDto.parse(body);
    const { dashboardId } = params;

    const backendRes = await BEclient.post<
      SendDashboardInvitationResponse,
      SendDashboardInvitationRequest
    >(`/dashboards/${dashboardId}/invitations`, validatedData);
    const data = sendDashboardInvitationResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ dashboardId: string }> },
): Promise<Response> {
  try {
    const { dashboardId } = await params;
    const searchParams = req.nextUrl.searchParams;
    const raw = {
      size: searchParams.get('size'),
      page: searchParams.get('page'),
    };

    const validParams = getDashboardInvitationsQueryDto.parse(raw);
    const query = new URLSearchParams({
      ...(validParams.size && { size: String(validParams.size) }),
      ...(validParams.page && { page: String(validParams.page) }),
    });

    const backendRes = await BEclient.get<GetDashboardInvitationsResponse>(
      `/dashboards/${dashboardId}/invitations?${query.toString()}`,
    );
    const data = getDashboardInvitationsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
