'use client';

import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/app/signup/_components/Checkbox';

export default function SignupForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: 회원가입 로직 구현
  };

  return (
    <form onSubmit={handleSubmit} className="w-[520px] flex flex-col gap-10" method="POST">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label className="lg-16px-semibold">이메일</label>
          <Input
            variant="primary"
            size="lg"
            className="w-full"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>닉네임</label>
          <Input
            variant="primary"
            size="lg"
            className="w-full"
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>비밀번호</label>
          <Input
            variant="primary"
            size="lg"
            className="w-full"
            type="password"
            name="password"
            placeholder="8자 이상 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>비밀번호 확인</label>
          <Input
            variant="primary"
            size="lg"
            className="w-full"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
        </div>
        <Checkbox />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        variant="primary"
        disabled={true}
        size="lg"
        full={true}
        className="h-[60px] mb-5 disabled:text-brand-950"
      >
        회원가입
      </Button>
    </form>
  );
}
