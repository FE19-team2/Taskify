'use client';

import React, { useCallback, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { DialogModal } from '@/components/ui/modal/Dialog';

const PROFILE_COLOR_CLASSES = [
  'bg-profile-green',
  'bg-profile-violet',
  'bg-profile-cyan',
  'bg-profile-rose',
  'bg-profile-cobalt',
  'bg-profile-yellow',
  'bg-profile-orange',
];

const getDeterministicColor = (label: string) => {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) & PROFILE_COLOR_CLASSES.length;
  }
  return PROFILE_COLOR_CLASSES[hash];
};

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  isOwner: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface MemberListItemProps {
  member: Member;
  onDelete: (memberId: number) => void;
  onDeleteSuccess?: () => void;
}

export default function MemberListItem({ member, onDeleteSuccess }: MemberListItemProps) {
  const initial = member.nickname.charAt(0);
  const iconColorClass = getDeterministicColor(member.nickname);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleDelete = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const { deleteDashboardMember } = await import('@/lib/api/services/members.service');
      await deleteDashboardMember(member.id);
      onDeleteSuccess?.();
    } catch (error) {
      console.error('멤버 삭제에 실패했습니다:', error);
      setDialogMessage('멤버 삭제에 실패했습니다.');
      setDialogOpen(true);
    } finally {
      setIsDeleting(false);
    }
  }, [member.id, onDeleteSuccess, isDeleting]);

  return (
    <div className="flex w-[740px] h-[59px] items-center justify-between p-4 border-b border-gray-700 bg-transparent">
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold  text-white  ${iconColorClass}`}
        >
          {initial}
        </div>

        {/* 닉네임 */}
        <span className="ml-1 text-white text-base truncate">{member.nickname}</span>

        {/* 대시보드 주인 왕관 표시 */}
        {member.isOwner && (
          <span className="text-yellow-400 text-lg" title="대시보드 소유자">
            👑
          </span>
        )}
      </div>

      {/* 🗑️ 삭제 버튼 (대시보드 주인은 삭제 불가) */}
      {!member.isOwner && (
        <Button
          variant="secondary"
          size="xs"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-sm px-4 py-2  transition duration-150"
        >
          {isDeleting ? '삭제중...' : '삭제'}
        </Button>
      )}
      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </div>
  );
}
