import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle';
import { cn } from '@/lib/utils/twmerge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'profile';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  full?: boolean;
  color?: 'rose' | 'orange' | 'yellow' | 'green' | 'cobalt';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, full, color }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
export default Button;
