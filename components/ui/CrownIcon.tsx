// @/components/icons/CrownIcon.tsx

import React from 'react';
import { cn } from '@/lib/utils/twmerge'; // cn 함수가 있다면 사용

const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={cn('w-full h-full', className)}
    {...props}
  >
    {' '}
    {/* 💡 SVG 파일에서 복사한 path나 다른 요소들을 넣고, fill을 currentColor로 설정 */}
    <path
      fill="currentColor"
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
    />
    {/* 이 d 값은 예시입니다. 실제 왕관 아이콘의 path를 사용해야 합니다. */}
  </svg>
);

export default CrownIcon;
