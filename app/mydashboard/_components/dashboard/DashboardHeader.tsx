import React from 'react';
import { Icon } from '@/components/ui/Icons/Icon';

interface DashboardHeaderProps {
  onSidebarToggle: () => void;
}

const DashboardHeader = ({ onSidebarToggle }: DashboardHeaderProps) => {
  return (
    // 💡 1. Header 레이아웃 (반응형 위치/너비 유지)
    <header
      className="fixed top-0 w-full h-[50px] md:h-16 flex items-center bg-black-400 border-b border-gray-800 z-40 
    md:left-64 md:w-[calc(100%-256px)] px-4 md:px-8 justify-between"
    >
      {/* 💡 2. 좌측 그룹 (모바일 토글 아이콘) */}
      <div className="flex items-center space-x-6">
        {/* 💡 토글 아이콘: 모바일에서만 보임 (md:hidden) */}
        <button
          onClick={onSidebarToggle}
          className="text-white md:hidden p-2 cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {/* 사용자 지정 아이콘 이름 "Toggle" 사용 */}
          <Icon name="Toggle" className="w-5 h-5" />
        </button>
      </div>

      {/* 💡 3. 우측 유틸리티 그룹 (관리/공유 버튼 및 아이콘) */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* ------------------------------------------- */}
        {/* 📌 관리 버튼 (Settings 아이콘 포함) */}
        {/* ------------------------------------------- */}
        <button
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition"
          aria-label="관리"
        >
          {/* 💡 아이콘을 먼저 배치 */}
          <Icon name="SettingIcon" className="w-5 h-5" />
          {/* 💡 텍스트: 모바일에서는 숨김 (hidden), 데스크톱에서만 보임 (md:block) */}
          <span className="hidden md:block">관리</span>
        </button>

        <button
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition"
          aria-label="공유"
        >
          <Icon name="UserPlus" className="w-6 h-6" />
          <span className="hidden md:block">공유</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
