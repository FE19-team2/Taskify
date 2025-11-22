// components/ui/button.tsx
import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle'; // CVA로 정의한 클래스
import { cn } from '@/lib/utils/twmerge'; // tailwind merge 함수

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'profile';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  full?: boolean;
  color?: 'rose' | 'orange' | 'yellow' | 'green' | 'cobalt'; // 👈 color prop 정의
}

// 💡 color prop을 함수 인자에서 추출합니다.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, full, color, ...props }, ref) => {
    // 👈 color 추가
    return (
      <button
        ref={ref} // 💡 CVA 함수에 color prop을 전달합니다.
        className={cn(buttonVariants({ variant, size, full, color }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
export default Button;
