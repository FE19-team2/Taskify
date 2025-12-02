// components/Sidebar.tsx

import React from 'react';
import { ActiveContent } from '../editType/EditTypes';

interface SidebarProps {
  // 현재 활성화된 상태를 받아 버튼의 스타일을 결정합니다.
  activeContent: ActiveContent;
  // '대시보드 편집' 또는 '멤버 관리' 버튼 클릭 시 호출됩니다.
  onContentChange: (content: ActiveContent) => void;
  // '삭제하기' 버튼 클릭 시 호출됩니다 (모달 열기).
  onDeleteClick: () => void;
}

export default function Sidebar({ activeContent, onContentChange, onDeleteClick }: SidebarProps) {
  const baseClasses = 'w-full p-3 text-left rounded-lg transition duration-150';
  const activeClasses = 'bg-transparent text-white font-bold';
  const inactiveClasses = 'text-gray-100 hover:bg-gray-600 hover:bg-opacity-50';

  return (
    <aside className="w-[540px] bg-black-500 shadow-lg p-4 flex flex-col space-y-2">
      {/* 1. 대시보드 편집 버튼 */}
      <div className="w-[276px] h-[175px] ml-auto mt-[90px]">
        <button
          // 클릭 시 'dashboard' 상태로 변경 요청
          onClick={() => onContentChange('dashboard')}
          className={`${baseClasses} ${activeContent === 'dashboard' ? activeClasses : inactiveClasses}`}
        >
          대시보드 편집
        </button>
        {/* 2. 멤버 관리 버튼 */}
        <button
          // 클릭 시 'members' 상태로 변경 요청
          onClick={() => onContentChange('members')}
          className={`${baseClasses} ${activeContent === 'members' ? activeClasses : inactiveClasses}`}
        >
          멤버 관리
        </button>
        <div className="flex-1" /> {/* 나머지 공간을 채워서 삭제 버튼을 하단에 배치 */}
        {/* 3. 삭제하기 버튼 (모달 열기 기능) */}
        <button
          // 클릭 시 모달 열기 함수 호출
          onClick={onDeleteClick}
          className={`${baseClasses} bg-transparent text-red-A hover:bg-gray-600 hover:bg-opacity-50'`}
        >
          삭제하기
        </button>
      </div>
    </aside>
  );
}
