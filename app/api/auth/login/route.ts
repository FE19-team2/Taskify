import { createErrorResponse } from '@/lib/api/handle-error';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BEclient } from '@/lib/api/server/api-client';
import {
  LoginReqDto,
  LoginBackendResDto,
  LoginBackendResponse,
  LoginRequest,
} from '@/lib/api/validations/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validate = LoginReqDto.parse(body);

    const backendRes = await BEclient.post<LoginBackendResponse, LoginRequest>(
      '/auth/login',
      validate,
    );
    const data = LoginBackendResDto.parse(backendRes);

    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json(
      { user: data.user },
      { status: 201, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
