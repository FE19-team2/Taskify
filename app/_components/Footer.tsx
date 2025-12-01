import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';
import EmailIcon from '@/public/images/email.svg';
import FacebookIcon from '@/public/images/facebook.svg';
import InstagramIcon from '@/public/images/instagram.svg';

export default function Footer() {
  return (
    <footer className="flex flex-col md:items-center justify-between px-5 py-3.5 md:px-[30px] md:py-6 lg:px-30 lg:py-6 md:flex-row">
      <Link href="/" className="relative mb-5 md:w-[186px] md:h-12 w-[158px] h-[33px] md:mb-0">
        <Image src={LogoImage} alt="태스키파이 로고" fill />
      </Link>
      <div className="flex gap-5 ml-2.5 md:ml-0 mb-5 md:mb-0 flex-col md:flex-row md:gap-25 hover:text-gray-100">
        <div className="flex gap-8">
          <Link
            href="/privacy"
            className=" text-gray-400 hover:text-gray-100 text-base font-medium"
          >
            Privacy Policy
          </Link>
          <Link href="/faq" className=" text-gray-400 hover:text-gray-100 text-base font-medium">
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-5 md:mb-0">
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
