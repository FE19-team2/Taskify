'use client';

import { useState } from 'react';
import Image from 'next/image';
import CheckedIcon from '@/public/images/check-active.svg';
import UncheckedIcon from '@/public/images/check-default.svg';

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="terms"
        className="hidden"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
      />
      <label htmlFor="terms" className="cursor-pointer select-none">
        <Image
          src={isChecked ? CheckedIcon : UncheckedIcon}
          alt="체크박스"
          width={20}
          height={20}
        />
      </label>
      <label htmlFor="terms" className="lg-16px-medium text-gray-300">
        이용약관에 동의합니다.
      </label>
    </div>
  );
}
