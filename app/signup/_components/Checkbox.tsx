'use client';

import Image from 'next/image';
import CheckedIcon from '@/public/images/check-active.svg';
import UncheckedIcon from '@/public/images/check-default.svg';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export default function Checkbox({ id, checked, onChange, children }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" id={id} className="hidden" checked={checked} onChange={onChange} />
      <label htmlFor={id} className="cursor-pointer select-none">
        <Image src={checked ? CheckedIcon : UncheckedIcon} alt="체크박스" width={20} height={20} />
      </label>
      <label htmlFor={id} className="lg-16px-medium text-gray-300 cursor-pointer select-none">
        {children}
      </label>
    </div>
  );
}
