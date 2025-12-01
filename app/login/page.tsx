import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './_components/LoginForm';
import LogoImage from '@/public/images/logo.svg';
import LoginImage from '@/public/images/login-image.svg';

export default function Page() {
  return (
    <div className="flex justify-between items-center min-h-screen w-full max-w-[1920px] mx-auto">
      <div className="w-[520px] mx-[210px]">
        <Link href="/" className="block mx-auto mb-10 w-[340px]">
          <Image src={LogoImage} alt="태스키파이 로고" width={340} height={87} />
        </Link>
        <LoginForm />
        <p className="text-center text-gray-400 whitespace-pre">
          회원이 아니신가요?{'  '}
          <Link href="/login" className="text-gray-300">
            로그인하기
          </Link>
        </p>
      </div>
      <Image src={LoginImage} alt="태스키파이 서비스 예시 이미지" width={900} height={920} />
    </div>
  );
}
