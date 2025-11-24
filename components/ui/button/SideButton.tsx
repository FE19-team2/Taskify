import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle';
import { cn } from '@/lib/utils/twmerge';
import IconMap from '@/components/ui/Icons/IconMap';

const { CrownIcon, HashIcon } = IconMap;

export interface SideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'side';
  full?: boolean;
  label: string;
  hasCrown?: boolean;
  hasHash?: boolean;
}
const CrownWrapper: React.FC = () => (
  <div className="shrink-0  ">
    <CrownIcon className="w-full h-full" />
  </div>
);

const HashWrapper: React.FC = () => (
  <div className="shrink-0  ">
    <HashIcon className="w-full h-full" />
  </div>
);

const SideButton = forwardRef<HTMLButtonElement, SideButtonProps>(
  ({ className, label, hasCrown = false, hasHash = false, ...props }, ref) => {
    const baseClassName = cn(buttonVariants({ variant: 'ghost', size: 'side' }), className);

    return (
      <button
        ref={ref}
        className={cn(baseClassName, 'flex items-center justify-between')}
        {...props}
      >
        <div className="flex items-center truncate">
          {hasHash && <HashWrapper />}

          <span className="text-white truncate">{label}</span>
        </div>

        {hasCrown && <CrownWrapper />}
      </button>
    );
  },
);
SideButton.displayName = 'SideButton';
export default SideButton;
