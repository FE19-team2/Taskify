'use client';

import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';

export default function LoginForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: 로그인 로직 구현
  };

  return (
    <form className="w-[520px] flex flex-col mb-5">
      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="email" className="lg-16px-semibold text-gray-300">
          이메일
        </label>
        <Input
          id="email"
          variant="primary"
          size="lg"
          className="w-full"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="flex flex-col gap-3 mb-10">
        <label className="lg-16px-semibold text-gray-300">비밀번호</label>
        <Input
          variant="primary"
          size="lg"
          className="w-full"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={true}
        size="lg"
        className="w-full mb-5 disabled:text-brand-950"
      >
        로그인
      </Button>
    </form>
  );
}
