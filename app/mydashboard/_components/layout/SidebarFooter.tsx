import React from 'react';
import { UserAvatar } from '@/components/ui/dropdown/UserAvatar';
import { Icon } from '@/components/ui/Icons/Icon';

interface SidebarFooterProps {
  userName: string;
}

const SidebarFooter = ({ userName }: SidebarFooterProps) => {
  return (
    <div className="p-3 border-t border-gray-700 bg-black-600">
      <div className="flex items-center justify-between h-14 w-full  px-1.5 py-3 rounded-xl hover:bg-gray-700 transition cursor-pointer">
        <div className="flex items-center space-x-2">
          <UserAvatar name={userName} className="w-8 h-8 text-base" />

          <span className="text-lg font-medium text-white">{userName}</span>
        </div>

        <div className="shrink-0">
          <Icon name="SettingIcon" className="w-6 h-6 text-gray-400 hover:text-white transition" />
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
