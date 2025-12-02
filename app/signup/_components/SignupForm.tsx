'use client';

import { useState } from 'react';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/app/signup/_components/Checkbox';

export default function SignupForm() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: 회원가입 로직 구현
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="lg-16px-semibold text-gray-300 cursor-pointer">
            이메일
          </label>
          <Input
            id="email"
            variant="primary"
            size="lg"
            className="w-full max-w-full"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="nickname" className="lg-16px-semibold text-gray-300 cursor-pointer">
            닉네임
          </label>
          <Input
            id="nickname"
            variant="primary"
            size="lg"
            className="w-full max-w-full"
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="lg-16px-semibold text-gray-300 cursor-pointer">
            비밀번호
          </label>
          <Input
            id="password"
            variant="primary"
            size="lg"
            className="w-full max-w-full"
            type="password"
            name="password"
            placeholder="8자 이상 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="confirmPassword"
            className="lg-16px-semibold text-gray-300 cursor-pointer"
          >
            비밀번호 확인
          </label>
          <Input
            id="confirmPassword"
            variant="primary"
            size="lg"
            className="w-full max-w-full"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
        </div>
        <Checkbox
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(event) => setAgreeTerms(event.target.checked)}
        >
          이용약관에 동의합니다.
        </Checkbox>
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={!agreeTerms}
        size="lg"
        className="w-full disabled:text-brand-950"
      >
        회원가입
      </Button>
    </form>
  );
}
