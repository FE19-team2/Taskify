import { FC } from 'react';
import { cn } from '@/lib/utils/twmerge';

const COLORS = [
  'bg-profile-green',
  'bg-profile-violet',
  'bg-profile-cyan',
  'bg-profile-rose',
  'bg-profile-cobalt',
  'bg-profile-yellow',
  'bg-profile-orange',
];

const stringToColorIndex = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % COLORS.length;
};

const getUserColorClass = (name: string): string => {
  const index = stringToColorIndex(name);
  return COLORS[index];
};

interface UserAvatarProps {
  name: string;
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, className }) => {
  const initial = name.charAt(0);

  const colorClass = getUserColorClass(name);

  return (
    <div
      className={cn(
        'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white',
        colorClass,
        className,
      )}
    >
      {initial}
    </div>
  );
};
