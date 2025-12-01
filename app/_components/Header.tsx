import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3.5 md:px-[30px] md:py-6 lg:px-30 lg:py-6">
      <Link href="/" className="relative md:w-[186px] md:h-12 w-[158px] h-[33px]">
        <Image src={LogoImage} alt="태스키파이 로고" fill />
      </Link>
      <div className="flex gap-9 px-3 py-2.5">
        <Link href="/login" className=" text-gray-400 hover:text-gray-100 text-base font-medium">
          로그인
        </Link>
        <Link href="/signup" className="text-gray-400 hover:text-gray-100 text-base font-medium">
          회원가입
        </Link>
      </div>
    </header>
  );
}
