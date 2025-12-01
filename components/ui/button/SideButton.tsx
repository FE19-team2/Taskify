import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle';
import { cn } from '@/lib/utils/twmerge';
import { Icon } from '@/components/ui/Icons/Icon';

const HASH_COLORS = [
  'text-profile-green',
  'text-profile-violet',
  'text-profile-cyan',
  'text-profile-rose',
  'text-profile-cobalt',
  'text-profile-yello',
  'text-profile-orange',
];

export interface SideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  label: string;
  hasCrown?: boolean;
  hasHash?: boolean;
}
const CrownWrapper = () => (
  <div className="shrink-0 w-4 h-4 ">
    <Icon name="CrownIcon" className="w-full h-full text-brand-400" />
  </div>
);
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * HASH_COLORS.length);
  return HASH_COLORS[randomIndex];
};

const HashWrapper = ({ colorClass }: { colorClass: string }) => (
  <div className="mt-4.5 shrink-0 w-6 h-6 ">
    <Icon name="HashIcon" className={cn('w-full h-full', colorClass)} />
  </div>
);

const SideButton = forwardRef<HTMLButtonElement, SideButtonProps>(
  ({ className, full, label, hasCrown = false, hasHash = false, ...props }, ref) => {
    const hashColorClass = getRandomColor();

    const baseClassName = cn(buttonVariants({ variant: 'ghost', size: 'side', full }), className);

    return (
      <button
        ref={ref}
        className={cn(baseClassName, 'flex items-stert justify-between')}
        {...props}
      >
        <div className="flex items-center truncate justify-between ">
          {/* ✅ 2. HashWrapper에 랜덤 색상 클래스 전달 */}
          {hasHash && <HashWrapper colorClass={hashColorClass} />}
          <span className="text-white ">{label}</span>
        </div>
        <div className="ml-2">{hasCrown && <CrownWrapper />}</div>
      </button>
    );
  },
);
SideButton.displayName = 'SideButton';
export default SideButton;
