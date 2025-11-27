import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  getInvitationsQueryDto,
  GetInvitationsResponse,
  getInvitationsResDto,
} from '@/lib/api/validations/invitations';

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const raw = {
      size: searchParams.get('size'),
      cursorId: searchParams.get('cursorId'),
      title: searchParams.get('title'),
    };
    const validatedQuery = getInvitationsQueryDto.parse(raw);
    const query = new URLSearchParams({
      ...(validatedQuery.size && { size: String(validatedQuery.size) }),
      ...(validatedQuery.cursorId && { cursorId: String(validatedQuery.cursorId) }),
      ...(validatedQuery.title && { title: String(validatedQuery.title) }),
    });
    const backendRes = await BEclient.get<GetInvitationsResponse>(
      `/invitations?${query.toString()}`,
    );
    const data = getInvitationsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
