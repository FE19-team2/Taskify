import { NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ dashboardId: string; invitationId: string }> },
): Promise<Response> {
  try {
    const { dashboardId, invitationId } = await params;
    await BEclient.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);

    return new Response(null, { status: 204 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
