import { NextRequest } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import { createErrorResponse } from '@/lib/api/handle-error';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
): Promise<Response> {
  try {
    const { memberId } = await params;
    await BEclient.delete<void>(`/members/${memberId}`);
    return new Response(null, { status: 204 });
  } catch (error) {
    return createErrorResponse(error);
  }
}
