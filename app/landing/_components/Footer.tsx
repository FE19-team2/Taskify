import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';
import EmailIcon from '@/public/images/email.svg';
import FacebookIcon from '@/public/images/facebook.svg';
import InstagramIcon from '@/public/images/instagram.svg';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-30 py-6">
      <Link href="/">
        <Image src={LogoImage} alt="태스키파이 로고" width={186} height={48} />
      </Link>
      <div className="flex gap-[88px]">
        <div className="flex gap-[8px]">
          <Link href="/privacy" className="px-[12px] py-[10px] text-gray-400 text-base font-medium">
            Privacy Policy
          </Link>
          <Link href="/faq" className="px-[12px] py-[10px] text-gray-400 text-base font-medium">
            FAQ
          </Link>
        </div>
        <div className="flex items-center justify-between gap-[14px]">
          <Link href="mailto:">
            <Image src={EmailIcon} alt="이메일 아이콘" width={20} height={20} />
          </Link>
          <Link href="https://www.facebook.com">
            <Image src={FacebookIcon} alt="페이스북 아이콘" width={20} height={20} />
          </Link>
          <Link href="https://www.instagram.com">
            <Image src={InstagramIcon} alt="인스타그램 아이콘" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
