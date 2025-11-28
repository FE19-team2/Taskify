import { FC } from 'react';
import { cn } from '@/lib/utils/twmerge';
import { generateDeterministicColorIndex } from '@/lib/utils/color-hashing';

const COLORS = [
  'bg-profile-green',
  'bg-profile-violet',
  'bg-profile-cyan',
  'bg-profile-rose',
  'bg-profile-cobalt',
  'bg-profile-yellow',
  'bg-profile-orange',
];

interface UserAvatarProps {
  name: string;
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, className }) => {
  const initial = name.charAt(0);

  const colorIndex = generateDeterministicColorIndex(name, COLORS.length);

  const colorClass = COLORS[colorIndex];

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
