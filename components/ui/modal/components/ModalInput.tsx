'use client';

import Input from '../../input/Input';
import { useConfirmModalStore } from '../ConfirmModalStore';

export function ModalInput({
  placeholder,
  hasColorBoard,
  onChange,
  value,
}: {
  placeholder: string;
  hasColorBoard: boolean;
  onChange: (value: string) => void;
  value?: string;
}) {
  const setTitle = useConfirmModalStore((state) => state.setTitle);

  const handleChange = (value: string) => {
    if (hasColorBoard) {
      setTitle(value);
    }
    onChange(value);
  };

  return (
    <div className="mb-[30px]">
      <h2 className="text-[14px] md:text-[16px] mb-2.5 font-semibold text-[#D6D5D9]">
        {hasColorBoard ? '대시보드 이름' : '이름'}
      </h2>
      <Input onChange={handleChange} placeholder={placeholder} value={value} />
    </div>
  );
}
