import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.svg';
import SignupForm from '@/app/signup/_components/SignupForm';

interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface SignUpError {
  email?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignUpResponse {
  success: boolean;
  message?: string;
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  message: string;
}

export default function Page() {
  return (
    <div className="my-[195px] flex justify-center items-center">
      <div className="w-[520px] h-[690px] flex justify-center items-center flex-col gap-10">
        <div className="mx-auto">
          <Link href="/">
            <Image src={LogoImage} alt="태스키파이 로고" width={340} height={87} />
          </Link>
        </div>
        <SignupForm />
        <div className="text-center -mt-[30px] text-gray-400 whitespace-pre">
          이미 회원이신가요?{' '}
          <Link href="/login" className="text-gray-300">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
