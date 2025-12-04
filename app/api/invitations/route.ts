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
    const raw: Record<string, string | undefined> = {};

    const sizeParam = searchParams.get('size');
    const cursorIdParam = searchParams.get('cursorId');
    const titleParam = searchParams.get('title');

    if (sizeParam !== null) raw.size = sizeParam;
    if (cursorIdParam !== null) raw.cursorId = cursorIdParam;
    if (titleParam !== null) raw.title = titleParam;

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
