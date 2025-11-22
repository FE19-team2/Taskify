import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle';
import { cn } from '@/lib/utils/twmerge';
import IconMap from '@/components/ui/Icons/IconMap';

const { CrownIcon, HashIcon } = IconMap;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'side';
  full?: boolean;
  label: string;
  hasCrown?: boolean;
  hasHash?: boolean;
}
const CrownWrapper: React.FC = () => (
  <div className="ml-2 shrink-0 w-4 h-4 text-green-500">
    <CrownIcon className="w-full h-full" />
  </div>
);

const HashWrapper: React.FC = () => (
  <div className="mt-5 mr-2 shrink-0 w-6 h-6 text-red-400">
    <HashIcon className="w-full h-full" />
  </div>
);

const SideButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, label, hasCrown = false, hasHash = false, ...props }, ref) => {
    const baseClassName = cn(buttonVariants({ variant, size, full }), className);

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
