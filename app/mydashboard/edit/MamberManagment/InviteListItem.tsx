'use client';
import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button';
import ivitationMock from '@/invitation_mock.json';
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
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationListItemProps {
  invitation: Invitation;
  onCancel: (id: number) => void;
}

export default function InvitationListItem({ invitation, onCancel }: InvitationListItemProps) {
  const inviteeEmail = invitation.inviter.email;

  const handleCancel = useCallback(() => {
    onCancel(invitation.id);
  }, [invitation.id, onCancel]);

  return (
    <div className="flex w-full h-[59px] items-center justify-between p-4 border-b border-gray-700 bg-transparent">
      <div className="flex items-center">
        <span className="text-white text-base truncate">{inviteeEmail}</span>
      </div>

      <Button
        variant="secondary"
        size="xs"
        onClick={handleCancel}
        className=" text-sm px-4 py-2  transition duration-150"
      >
        취소
      </Button>
    </div>
  );
}
