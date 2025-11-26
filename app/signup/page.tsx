import React from 'react';
import Image from 'next/image';
import LogoImage from '@/public/images/logo.svg';
import Link from 'next/link';

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
    <div className="my-[195px]">
      <div className="w-[520px] h-[690px] mx-auto">
        <div className="w-[340px] h-[87px] mb-10 flex items-center justify-center mx-auto mb-8">
          <Link href="/">
            <Image
              src={LogoImage}
              alt="태스키파이 로고"
              width={340}
              height={87}
              className="w-[98%]"
            />
          </Link>
        </div>
        <form method="POST">
          <div className="mb-3">이메일</div>
          <input
            type="email"
            name="email"
            className="w-full h-[54px] mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mb-3">닉네임</div>
          <input
            type="text"
            name="nickname"
            className="w-full h-[54px] mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mb-3">비밀번호</div>
          <input
            type="password"
            name="password"
            className="w-full h-[54px] mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mb-3">비밀번호 확인</div>
          <input
            type="password"
            name="confirmPassword"
            className="w-full h-[54px] mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="mb-10">
            <input type="checkbox" /> 이용약관에 동의합니다.
          </div>
          <button type="submit" className="w-full h-[60px] mb-5 bg-brand-500 cursor-pointer">
            회원가입
          </button>
          <div className="text-center">
            이미 회원이신가요? <Link href="/login">로그인하기</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
