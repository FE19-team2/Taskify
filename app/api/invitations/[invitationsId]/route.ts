import { NextResponse, NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';
import {
  RespondInvitationRequest,
  respondInvitationReqDto,
  respondInvitationResDto,
  RespondInvitationResponse,
} from '@/lib/api/validations/invitations';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ invitationsId: string }> },
): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = respondInvitationReqDto.parse(body);
    const { invitationsId } = await params;

    const backendRes = await BEclient.put<RespondInvitationResponse, RespondInvitationRequest>(
      `/invitations/${invitationsId}`,
      validatedData,
    );
    const data = respondInvitationResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    return createErrorResponse(err);
  }
}
