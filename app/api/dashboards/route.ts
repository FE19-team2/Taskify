import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  createDashboardReqDto,
  createDashboardResDto,
  CreateDashboardRequest,
  CreateDashboardResponse,
  getDashboardsQueryDto,
  getDashboardsResDto,
  GetDashboardsResponse,
} from '@/lib/api/validations/dashboards';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = createDashboardReqDto.parse(body);

    const backendRes = await BEclient.post<CreateDashboardResponse, CreateDashboardRequest>(
      '/dashboards',
      validatedData,
    );
    const data = createDashboardResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const raw = {
      size: searchParams.get('size'),
      cursorId: searchParams.get('cursorId'),
    };
    const validatedQuery = getDashboardsQueryDto.parse(raw);
    const query = new URLSearchParams({
      navigationMethod: 'infiniteScroll',
      ...(validatedQuery.size && { size: String(validatedQuery.size) }),
      ...(validatedQuery.cursorId && { cursorId: String(validatedQuery.cursorId) }),
    });

    const backendRes = await BEclient.get<GetDashboardsResponse>(`/dashboards?${query.toString()}`);
    const data = getDashboardsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
