import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Image/Logo';

const SidebarHeader = () => {
  return (
    <div className="w-full h-11 px-4 pt-2 flex items-center">
      <Link href="/">
        <Logo width={156} height={40} />
      </Link>
    </div>
  );
};

export default SidebarHeader;
