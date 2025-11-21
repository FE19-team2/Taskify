import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle'; // CVA로 정의한 클래스
import { cn } from '@/lib/utils/twmerge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'side';
  full?: boolean;
}

const SideButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, full }), className)}
        {...props}
      />
    );
  },
);

SideButton.displayName = 'SideButton';
export default SideButton;
