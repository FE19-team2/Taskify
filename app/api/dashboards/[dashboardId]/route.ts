import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  updateDashboardReqDto,
  updateDashboardResDto,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  getDashboardByIdResDto,
  GetDashboardByIdResponse,
} from '@/lib/api/validations/dashboards';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ dashboardId: string }> },
): Promise<Response> {
  try {
    const { dashboardId } = await params;

    const backendRes = await BEclient.get<GetDashboardByIdResponse>(`/dashboards/${dashboardId}`);
    const data = getDashboardByIdResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ dashboardId: string }> },
): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = updateDashboardReqDto.parse(body);
    const { dashboardId } = await params;

    const backendRes = await BEclient.put<UpdateDashboardResponse, UpdateDashboardRequest>(
      `/dashboards/${dashboardId}`,
      validatedData,
    );
    const data = updateDashboardResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ dashboardId: string }> },
): Promise<Response> {
  try {
    const { dashboardId } = await params;
    await BEclient.delete(`/dashboards/${dashboardId}`);

    return new Response(null, { status: 204 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
