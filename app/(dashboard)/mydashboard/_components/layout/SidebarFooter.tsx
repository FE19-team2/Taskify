import React from 'react';
import { UserAvatar } from '@/components/ui/dropdown/UserAvatar';
import { Icon } from '@/components/ui/Icons/Icon';
import Image from 'next/image';

interface SidebarFooterProps {
  userName: string;
  userEmail: string;
  profileImageUrl: string | null;
  onProfileClick?: () => void;
}

const SidebarFooter = ({
  userName,
  userEmail,
  profileImageUrl,
  onProfileClick,
}: SidebarFooterProps) => {
  return (
    <div className="border-t border-gray-700 pt-3 px-3">
      <button
        onClick={onProfileClick}
        className="flex items-center gap-3 w-full py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
      >
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={userName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <UserAvatar name={userName} className="w-10 h-10 text-base" />
        )}

        <div className="flex-1 text-left min-w-0">
          <p className="text-white text-sm font-medium truncate">{userName}</p>
          {userEmail && <p className="text-gray-400 text-xs truncate">{userEmail}</p>}
        </div>

        <div className="shrink-0">
          <Icon name="SettingIcon" className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    </div>
  );
};

export default SidebarFooter;
