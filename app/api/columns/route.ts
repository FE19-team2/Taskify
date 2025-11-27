import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  createColumnReqDto,
  createColumnResDto,
  CreateColumnRequest,
  CreateColumnResponse,
  getColumnsResDto,
  GetColumnsResponse,
} from '@/lib/api/validations/columns';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = createColumnReqDto.parse(body);

    const backendRes = await BEclient.post<CreateColumnResponse, CreateColumnRequest>(
      '/columns',
      validatedData,
    );
    const data = createColumnResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const backendRes = await BEclient.get<GetColumnsResponse>(
      `/columns?${searchParams.toString()}`,
    );
    const data = getColumnsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
