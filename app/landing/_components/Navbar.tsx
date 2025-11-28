import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';

export default function Navbar() {
  return (
    <nav className="flex h-[96px] items-center justify-between px-30 py-6">
      <Link href="/">
        <Image src={LogoImage} alt="태스키파이 로고" width={186} height={48} />
      </Link>
      <div className="flex gap-[14px]">
        <Link href="/login" className="px-[12px] py-[10px]">
          로그인
        </Link>
        <Link href="/signup" className="px-[12px] py-[10px]">
          회원가입
        </Link>
      </div>
    </nav>
  );
}
