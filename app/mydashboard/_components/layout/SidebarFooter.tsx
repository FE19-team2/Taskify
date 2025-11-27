import React from 'react';
import { UserAvatar } from '@/components/ui/dropdown/UserAvatar';
import { Icon } from '@/components/ui/Icons/Icon';

interface SidebarFooterProps {
  userName: string;
}

const SidebarFooter = ({ userName }: SidebarFooterProps) => {
  return (
    <div className="p-3 border-t border-gray-700 bg-black-600">
      <div className="flex items-center justify-between h-14 w-full px-1.5 py-3 rounded-[12px] hover:bg-gray-700 transition cursor-pointer">
        {/* 1. 좌측 영역: UserAvatar 및 이름 */}
        <div className="flex items-center space-x-2">
          {/* UserAvatar 컴포넌트 사용 (첫 글자 및 랜덤 색상) */}
          <UserAvatar name={userName} className="w-8 h-8 text-md" />

          {/* 사용자 이름 */}
          <span className="text-lg font-medium text-white">{userName}</span>
        </div>

        {/* 2. 우측 영역: 설정 아이콘 (톱니바퀴) */}
        {/* Icon 컴포넌트를 버튼처럼 클릭 가능하게 만듭니다. */}
        <div className="shrink-0">
          <Icon name="SettingIcon" className="w-6 h-6 text-gray-400 hover:text-white transition" />
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
