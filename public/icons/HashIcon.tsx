import React from 'react';
import { cn } from '@/lib/utils/twmerge';

const HashIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 11"
    fill="none"
    className={cn('w-full h-full', className)}
    {...props}
  >
    <path
      d="M0.644 4.094L0.782 2.553H2.691L3.082 0.161L4.807 0L4.393 2.553H6.164L6.555 0.161L8.257 0L7.843 2.553H9.775L9.637 4.094H7.59L7.337 5.796H9.131L8.993 7.36H7.084L6.693 9.867L4.968 10.028L5.382 7.36H3.634L3.243 9.867L1.518 10.028L1.932 7.36H0L0.138 5.796H2.185L2.461 4.094H0.644ZM4.14 4.094L3.887 5.796H5.635L5.911 4.094H4.14Z"
      fill="currentColor"
    />
  </svg>
);

export default HashIcon;
