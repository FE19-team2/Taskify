'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icons/Icon';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  onSidebarToggle: () => void;
}

const DashboardHeader = ({ onSidebarToggle }: DashboardHeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // 쿠키에서 토큰 삭제
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // 로그인 페이지로 리다이렉트
    router.push('/login');
  };

  return (
    <header
      className="fixed top-0 w-full h-[50px] md:h-16 flex items-center bg-black-400 border-b border-gray-800 z-40 
    md:left-64 md:w-[calc(100%-256px)] px-4 md:px-8 justify-between"
    >
      <div className="flex items-center space-x-6">
        <button
          onClick={onSidebarToggle}
          className="text-white md:hidden p-2 cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Icon name="Toggle" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <button
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition"
          aria-label="관리"
        >
          <Icon name="SettingIcon" className="w-5 h-5" />
          <span className="hidden md:block">관리</span>
        </button>

        <button
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition"
          aria-label="공유"
        >
          <Icon name="UserPlus" className="w-6 h-6" />
          <span className="hidden md:block">공유</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition"
          aria-label="로그아웃"
        >
          <Icon name="LogOut" className="w-5 h-5" />
          <span className="hidden md:block">로그아웃</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
