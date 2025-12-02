'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/services/auth.service';
import { HttpError } from '@/lib/api/request-core';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { DialogModal } from '@/components/ui/modal/Dialog';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const isValidEmail = (email: string) => EMAIL_REGEX.test(email);

export default function LoginForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
      router.push('/mydashboard');
    } catch (error) {
      setIsModalOpen(true);
      setLoginError((error as HttpError).message || '로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
    setEmailError(value && !isValidEmail(value) ? '이메일 형식이 올바르지 않습니다' : '');
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
    setPasswordError(
      value && value.length < MIN_PASSWORD_LENGTH ? '비밀번호는 8자리 이상이어야 합니다' : '',
    );
  };

  const isButtonEnabled =
    isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH && !emailError && !passwordError;

  return (
    <form className="w-full sm:w-[520px] flex flex-col items-center mb-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 mb-4 w-full">
        <label htmlFor="email" className="lg-16px-semibold text-gray-300">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          onChange={handleChangeEmail}
          className={emailError ? 'border-[#CA372B]' : ''}
          errorMessage={emailError}
        />
      </div>
      <div className="flex flex-col gap-3 mb-[30px] sm:mb-10 w-full">
        <label htmlFor="password" className="lg-16px-semibold text-gray-300">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChangePassword}
          className={passwordError ? 'border-[#CA372B]' : ''}
          errorMessage={passwordError}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!isButtonEnabled}
        className="disabled:text-brand-950"
      >
        로그인
      </Button>
      <DialogModal
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        description={loginError}
      />
    </form>
  );
}
