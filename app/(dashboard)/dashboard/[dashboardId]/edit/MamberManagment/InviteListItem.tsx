'use client';
import React, { useCallback, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { DialogModal } from '@/components/ui/modal/Dialog';
export interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  dashboard: {
    title: string;
    id: number;
  };
  inviteAccepted: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface InvitationListItemProps {
  invitation: Invitation;
  dashboardId: number;
  onCancel: (id: number) => void;
  onCancelSuccess?: () => void;
}

export default function InvitationListItem({
  invitation,
  dashboardId,
  onCancelSuccess,
}: InvitationListItemProps) {
  const inviteeEmail = invitation.invitee.email;
  const [isCanceling, setIsCanceling] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleCancel = useCallback(async () => {
    if (isCanceling) return;

    setIsCanceling(true);
    try {
      const { revokeDashboardInvitation } = await import('@/lib/api/services/dashboards.service');
      await revokeDashboardInvitation(dashboardId, invitation.id);
      onCancelSuccess?.();
    } catch (error) {
      console.error('초대 취소에 실패했습니다:', error);
      setDialogMessage('초대 취소에 실패했습니다.');
      setDialogOpen(true);
    } finally {
      setIsCanceling(false);
    }
  }, [dashboardId, invitation.id, onCancelSuccess, isCanceling]);

  return (
    <div className="flex w-full h-[59px] items-center justify-between p-4 border-b border-gray-700 bg-transparent">
      <div className="flex items-center">
        <span className="text-white text-base truncate">{inviteeEmail}</span>
      </div>

      <Button
        variant="secondary"
        size="xs"
        onClick={handleCancel}
        disabled={isCanceling}
        className=" text-sm px-4 py-2  transition duration-150"
      >
        {isCanceling ? '취소중...' : '취소'}
      </Button>
      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </div>
  );
}
