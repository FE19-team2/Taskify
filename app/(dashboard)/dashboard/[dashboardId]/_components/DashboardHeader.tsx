'use client';

import { Icon } from '@/components/ui/Icons/Icon';
import { useRouter } from 'next/navigation';

type DashboardHeaderProps = {
  title: string;
  onManageDashboard: () => void;
  onInviteMembers: () => void;
};

export function DashboardHeader({
  title,
  onManageDashboard,
  onInviteMembers,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // 쿠키에서 토큰 삭제
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // 로그인 페이지로 리다이렉트
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-between border-b border-[#2F2F33]">
      <div className="flex items-center gap-2">
        <Icon name="CrownIcon" className="w-6 h-6 text-[#5534DA]" />
        <h1 className="text-[18px] md:text-[20px] font-bold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onManageDashboard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2F2F33] hover:border-[#5534DA] transition-colors"
        >
          <Icon name="SettingIcon" className="w-5 h-5 text-gray-500" />
          <span className="text-[14px] md:text-[16px] text-white">관리</span>
        </button>

        <button
          onClick={onInviteMembers}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2F2F33] hover:border-[#5534DA] transition-colors"
        >
          <Icon name="UserPlus" className="w-5 h-5 text-gray-500" />
          <span className="text-[14px] md:text-[16px] text-white">초대하기</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2F2F33] hover:border-red-500 transition-colors"
        >
          <Icon name="LogOut" className="w-5 h-5 text-gray-500 hover:text-red-500" />
          <span className="text-[14px] md:text-[16px] text-white hover:text-red-500">로그아웃</span>
        </button>
      </div>
    </div>
  );
}
