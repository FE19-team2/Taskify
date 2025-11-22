import { forwardRef } from 'react';
import { buttonVariants } from './ButtonStyle'; // CVA로 정의한 클래스
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
  // Tailwind로 크기, 여백 및 색상 제어
  <div className="ml-2 shrink-0 w-4 h-4 text-green-500">
    <CrownIcon className="w-full h-full" />
  </div>
);

const HashWrapper: React.FC = () => (
  // Tailwind로 크기, 여백 및 색상 제어
  // 이미지에 따라 색상은 SVG 파일 내부의 fill="currentColor"를 통해 제어될 수 있습니다.
  <div className="mt-5 mr-2 shrink-0 w-6 h-6 text-red-400">
    <HashIcon className="w-full h-full" />
  </div>
);

const SideButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      full,
      label,
      hasCrown = false, // 기본값: 숨김
      hasHash = false, // 기본값: 숨김
      ...props
    },
    ref,
  ) => {
    // CVA 스타일과 사용자 정의 스타일을 병합합니다.
    const baseClassName = cn(buttonVariants({ variant, size, full }), className);

    return (
      <button
        ref={ref}
        // Flexbox를 사용하여 내부 요소를 양쪽 끝으로 정렬
        className={cn(baseClassName, 'flex items-center justify-between')}
        {...props}
      >
        {/* 1. 좌측 라벨 영역 */}
        <div className="flex items-center truncate">
          {/* 💡 # 아이콘 (조건부 렌더링) */}
          {hasHash && <HashWrapper />}

          <span className="text-white truncate">{label}</span>
        </div>

        {/* 2. 왕관 아이콘 (조건부 렌더링) */}
        {hasCrown && <CrownWrapper />}
      </button>
    );
  },
);
SideButton.displayName = 'SideButton';
export default SideButton;
