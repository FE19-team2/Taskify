import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/ui/Image/Logo';

const SidebarHeader = () => {
  return (
    // 💡 변경: h-11 대신 시안에 맞는 패딩을 위해 pt-4 pb-[3px] (대략 44px 높이)
    // 현재 px-4 (16px)를 유지하며 왼쪽 여백 16px 확보
    <div className="w-full h-[44px] px-4 pt-2 flex items-center">
      <Link href="/">
        <Logo width={156} height={40} />
      </Link>
    </div>
  );
};

export default SidebarHeader;
