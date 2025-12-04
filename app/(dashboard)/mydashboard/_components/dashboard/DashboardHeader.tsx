'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icons/Icon';
import { useRouter, usePathname } from 'next/navigation';
import { getDashboardById } from '@/lib/api/services/dashboards.service';

interface DashboardHeaderProps {
  onSidebarToggle: () => void;
}

const DashboardHeader = ({ onSidebarToggle }: DashboardHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      const match = pathname.match(/\/dashboard\/(\d+)/);
      console.log('🔍 현재 경로:', pathname);
      console.log('🔍 매치 결과:', match);
      if (match) {
        const dashboardId = Number(match[1]);
        try {
          const dashboard = await getDashboardById(dashboardId);
          console.log('🔍 대시보드 정보:', dashboard);
          console.log('🔍 createdByMe:', dashboard.createdByMe);
          setIsOwner(dashboard.createdByMe);
        } catch (error) {
          console.error('대시보드 정보 조회 실패:', error);
          setIsOwner(false);
        }
      } else {
        console.log('🔍 대시보드 페이지가 아님');
        setIsOwner(false);
      }
    };

    checkOwnership();
  }, [pathname]);

  const handleManage = () => {
    // 현재 경로에서 dashboardId 추출
    const match = pathname.match(/\/dashboard\/(\d+)/);
    if (match) {
      const dashboardId = match[1];
      router.push(`/dashboard/${dashboardId}/edit`);
    } else {
      console.log('현재 대시보드 페이지가 아닙니다');
    }
  };

  const handleLogout = async () => {
    try {
      // 서버에서 쿠키 삭제
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      // 로그인 페이지로 리다이렉트
      router.push('/login');
    }
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
        {isOwner && (
          <button
            onClick={handleManage}
            className="flex items-center space-x-1 text-gray-400 hover:text-white transition cursor-pointer"
            aria-label="관리"
          >
            <Icon name="SettingIcon" className="w-5 h-5" />
            <span className="hidden md:block">관리</span>
          </button>
        )}

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
