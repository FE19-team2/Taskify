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

const getDetermainisticColor = (label: string) => {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) % HASH_COLORS.length;
  }
  return HASH_COLORS[hash];
};

const HashWrapper = ({ colorClass }: { colorClass: string }) => (
  <div className="mt-4.5 shrink-0 w-6 h-6 ">
    <Icon name="HashIcon" className={cn('w-full h-full', colorClass)} />
  </div>
);

const SideButton = forwardRef<HTMLButtonElement, SideButtonProps>(
  ({ className, full, label, hasCrown = false, hasHash = false, ...props }, ref) => {
    const hashColorClass = getDetermainisticColor(label);

    const baseClassName = cn(buttonVariants({ variant: 'ghost', size: 'side', full }), className);

    return (
      <button
        ref={ref}
        className={cn(baseClassName, 'flex items-center justify-between')}
        {...props}
      >
        <div className="flex items-center truncate justify-between ">
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
