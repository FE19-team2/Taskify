// components/ui/button.tsx
import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle'; // CVA로 정의한 클래스
import { cn } from '@/lib/utils/twmerge'; // tailwind merge 함수

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'profile';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  full?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

Button.displayName = 'Button';
export default Button;
