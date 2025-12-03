'use client';

import Input from '../../input/Input';

export function ModalInput({
  placeholder,
  hasColorBoard,
  onChange,
}: {
  placeholder: string;
  hasColorBoard: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-[30px]">
      <h2 className="text-[14px] md:text-[16px] mb-2.5 font-semibold text-[#D6D5D9]">
        {hasColorBoard ? '대시보드 이름' : '이름'}
      </h2>
      <Input onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
