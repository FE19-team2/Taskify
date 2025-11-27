import { NextResponse } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  signUpReqDto,
  signUpResDto,
  SignUpRequest,
  SignUpResponse,
} from '@/lib/api/validations/sign-up';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = signUpReqDto.parse(body);

    const backendRes = await BEclient.post<SignUpResponse, SignUpRequest>('/users', validatedData);
    const data = signUpResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
