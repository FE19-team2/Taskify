// components/Sidebar.tsx

'use client';
import React from 'react';
import { ActiveContent } from '../editType/EditTypes';

interface SidebarProps {
  // 현재 활성화된 상태를 받아 버튼의 스타일을 결정합니다.
  activeContent: ActiveContent;
  // '대시보드 편집' 또는 '멤버 관리' 버튼 클릭 시 호출됩니다.
  onContentChange: (content: ActiveContent) => void;
  // '삭제하기' 버튼 클릭 시 호출됩니다 (모달 열기).
  onDeleteClick: () => void;
  // 대시보드 소유자 여부
  isOwner: boolean;
  // 삭제 중 상태
  isDeleting: boolean;
}

export default function Sidebar({
  activeContent,
  onContentChange,
  onDeleteClick,
  isOwner,
  isDeleting,
}: SidebarProps) {
  const baseClasses = 'w-full p-3 text-left rounded-lg transition duration-150';
  const activeClasses = 'bg-transparent text-white font-bold';
  const inactiveClasses = 'text-gray-100 hover:bg-gray-600 hover:bg-opacity-50';
  const disabledClasses = 'text-gray-500 cursor-not-allowed opacity-50';

  return (
    <aside className="w-[540px] bg-black-500 shadow-lg p-4 flex flex-col h-full">
      <div className="w-[276px] ml-auto mt-[90px] space-y-2">
        {/* 1. 대시보드 편집 버튼 */}
        <button
          onClick={() => onContentChange('dashboard')}
          className={`${baseClasses} ${activeContent === 'dashboard' ? activeClasses : inactiveClasses}`}
        >
          대시보드 편집
        </button>
        {/* 2. 멤버 관리 버튼 */}
        <button
          onClick={() => onContentChange('members')}
          className={`${baseClasses} ${activeContent === 'members' ? activeClasses : inactiveClasses}`}
        >
          멤버 관리
        </button>
        {/* 3. 삭제하기 버튼 */}
        <button
          onClick={onDeleteClick}
          disabled={!isOwner || isDeleting}
          className={`${baseClasses} ${!isOwner || isDeleting ? disabledClasses : 'bg-transparent text-red-A hover:bg-gray-600 hover:bg-opacity-50'}`}
          title={!isOwner ? '소유자만 삭제할 수 있습니다' : ''}
        >
          {isDeleting ? '삭제 중...' : '삭제하기'}
        </button>
      </div>
    </aside>
  );
}
