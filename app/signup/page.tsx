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
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-[520px] flex flex-col items-center gap-10">
        <Link href="/" className="block">
          <Image
            src={LogoImage}
            alt="태스키파이 로고"
            width={340}
            height={87}
            className="w-[300px] sm:w-[340px] h-auto"
          />
        </Link>
        <SignupForm />
      </div>
      <p className="text-center text-gray-400 mt-[20px] whitespace-pre">
        이미 회원이신가요?{'  '}
        <Link href="/login" className="text-gray-300">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
