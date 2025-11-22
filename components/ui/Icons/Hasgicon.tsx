// @/components/icons/HashIcon.tsx

import React from 'react';
import { cn } from '@/lib/utils/twmerge';

const HashIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // 👈 실제 해시 아이콘의 viewBox 값으로 변경하세요.
    fill="none"
    className={cn('w-full h-full', className)}
    {...props}
  >
    {/* 💡 여기에 HashIcon SVG 파일에서 복사한 path나 다른 요소들을 넣습니다. */}
    <path
      // 👈 HashIcon의 실제 d 값을 여기에 넣으세요.
      d="M3.7563 7.08033L3.8943 5.53933H5.8033L6.1943 3.14733L7.9193 2.98633L7.5053 5.53933H9.2763L9.66731 3.14733L11.3693 2.98633L10.9553 5.53933H12.8873L12.7493 7.08033H10.7023L10.4493 8.78233H12.2433L12.1053 10.3463H10.1963L9.80531 12.8533L8.0803 13.0143L8.49431 10.3463H6.7463L6.3553 12.8533L4.6303 13.0143L5.0443 10.3463H3.1123L3.2503 8.78233H5.2973L5.5733 7.08033H3.7563ZM7.25231 7.08033L6.99931 8.78233H8.7473L9.0233 7.08033H7.25231Z"
      // 💡 fill 속성을 'currentColor'로 설정하여 CSS로 색상을 제어합니다.
      stroke="currentColor" // 해시(#) 기호는 보통 stroke(선)으로 정의될 수 있습니다.
      strokeWidth="2" // 필요에 따라 조정
    />
  </svg>
);

export default HashIcon;
