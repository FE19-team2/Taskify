'use client';

import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button';
import { int } from 'zod';

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
  profileImageUrl: string;
  isOwner: boolean;
}

interface MemberListItemProps {
  member: Member;
  onDelete: (memberId: number) => void;
}

export default function MemberListItem({ member, onDelete }: MemberListItemProps) {
  const initial = member.nickname.charAt(0);
  const iconColorClass = getDeterministicColor(member.nickname);

  const handleDelete = useCallback(() => {
    onDelete(member.id);
  }, [onDelete, member.id]);

  return (
    <div className="flex w-[740px] h-[59px] items-center justify-between p-4 border-b border-gray-700 bg-transparent">
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold  text-white  ${iconColorClass}`}
        >
          {initial}
        </div>

        {/* 닉네임 */}
        <span className="ml-3 text-white text-base truncate">{member.nickname}</span>
      </div>

      {/* 🗑️ 삭제 버튼 (사용자 정의 Button 컴포넌트 사용) */}
      <Button
        variant="secondary"
        size="xs"
        onClick={handleDelete}
        className="text-sm px-4 py-2  transition duration-150"
      >
        삭제
      </Button>
    </div>
  );
}
