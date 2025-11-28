import { NextRequest, NextResponse } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  User,
  updateProfileReqDto,
  UpdateProfileRequest,
  updateProfileResDto,
  UpdateProfileResponse,
} from '@/lib/api/validations/users';

export async function GET(): Promise<Response> {
  try {
    const backendRes = await BEclient.get<User>('/users/me');
    return NextResponse.json(backendRes);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}

export async function PUT(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = updateProfileReqDto.parse(body);

    const backendRes = await BEclient.put<UpdateProfileResponse, UpdateProfileRequest>(
      '/users/me',
      validatedData,
    );
    const data = updateProfileResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
