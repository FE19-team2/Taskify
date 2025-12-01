import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './_components/LoginForm';
import LogoImage from '@/public/images/logo.svg';
import LoginImage from '@/public/images/login-image.svg';

export default function Page() {
  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:px-0">
      <div className="w-full px-6 sm:w-[520px] lg:mx-[210px]">
        <Link href="/" className="block mx-auto mb-[30px] sm:mb-10 w-[340px]">
          <Image
            src={LogoImage}
            alt="태스키파이 로고"
            width={340}
            height={87}
            className="w-[300px] sm:w-[340px] h-auto"
          />
        </Link>
        <LoginForm />
        <p className="text-center text-gray-400 whitespace-pre">
          회원이 아니신가요?{'  '}
          <Link href="/signup" className="text-gray-300">
            회원가입하기
          </Link>
        </p>
      </div>
      <Image
        src={LoginImage}
        alt="태스키파이 서비스 예시 이미지"
        width={900}
        height={920}
        className="hidden lg:block lg:mr-[80px]"
      />
    </div>
  );
}
