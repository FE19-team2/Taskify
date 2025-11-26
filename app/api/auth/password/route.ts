import { createErrorResponse } from '@/lib/api/handle-error';
import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { PasswordChange, PasswordChangeDto } from '@/lib/api/validations/auth';

export async function PUT(req: NextRequest): Promise<NextResponse<null | { message: string }>> {
  try {
    const body = await req.json();
    const validatedData = PasswordChangeDto.parse(body);

    await BEclient.put<void, PasswordChange>('/auth/password', validatedData);

    return NextResponse.json(null, { status: 204 });
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
