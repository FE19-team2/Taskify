'use client';

import { useState } from 'react';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/app/signup/_components/Checkbox';
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
} from '@/app/signup/_components/Validation';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // 이메일 입력 핸들러
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (emailError) setEmailError('');
  };

  // 이메일 blur 시 검증
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  // 닉네임 입력 핸들러
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\s/g, '');
    setNickname(value);
    if (nicknameError) setNicknameError('');
  };

  // 닉네임 blur 시 검증
  const handleNicknameBlur = () => {
    const error = validateNickname(nickname);
    setNicknameError(error);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (passwordError) setPasswordError('');
  };

  // 비밀번호 blur 시 검증
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (!validatePassword(password)) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  // 비밀번호 확인 blur 시 검증
  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // 전체 필드 유효 여부 확인
  const isFormValid = () => {
    return (
      email !== '' &&
      !emailError &&
      nickname !== '' &&
      !nicknameError &&
      password !== '' &&
      !passwordError &&
      confirmPassword !== '' &&
      !confirmPasswordError &&
      agreeTerms
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 모든 필드 최종 검증
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      hasError = true;
    }

    if (!validateNickname(nickname)) {
      setNicknameError('닉네임은 2자 이상 10자 이하로 입력해주세요.');
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      hasError = true;
    }

    if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      hasError = true;
    }

    if (hasError) return;

    // TODO: 회원가입 API 호출
    console.log('회원가입 데이터:', { email, nickname, password, agreeTerms });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        {/* 이메일 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="lg-16px-semibold text-gray-300 cursor-pointer">
            이메일
          </label>
          <Input
            id="email"
            variant="primary"
            size="lg"
            status={emailError ? 'error' : undefined}
            className="w-full max-w-full"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="이메일을 입력해주세요"
          />
          {emailError && <p className="-mt-1 mx-2 text-red-A text-sm">{emailError}</p>}
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="nickname" className="lg-16px-semibold text-gray-300 cursor-pointer">
            닉네임
          </label>
          <Input
            id="nickname"
            variant="primary"
            size="lg"
            status={nicknameError ? 'error' : undefined}
            className="w-full max-w-full"
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            placeholder="닉네임을 입력해주세요"
          />
          {nicknameError && <p className="-mt-1 mx-2 text-red-A text-sm">{nicknameError}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="lg-16px-semibold text-gray-300 cursor-pointer">
            비밀번호
          </label>
          <Input
            id="password"
            variant="primary"
            size="lg"
            status={passwordError ? 'error' : undefined}
            className="w-full max-w-full"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="8자 이상 입력해주세요"
          />
          {passwordError && <p className="-mt-1 mx-2 text-red-A text-sm">{passwordError}</p>}
        </div>

        {/* 비밀번호 확인 */}
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
            status={confirmPasswordError ? 'error' : undefined}
            className="w-full max-w-full"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
          {confirmPasswordError && (
            <p className="-mt-1 mx-2 text-red-A text-sm">{confirmPasswordError}</p>
          )}
        </div>

        {/* 약관 동의 */}
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
        disabled={!isFormValid()}
        size="lg"
        className="w-full disabled:text-brand-950 cursor-pointer"
      >
        회원가입
      </Button>
    </form>
  );
}
