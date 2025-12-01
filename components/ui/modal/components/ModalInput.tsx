'use client';

import Input from '../../input/Input';

export function ModalInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="mb-[30px]">
      <Input className="px-5 py-1.5" placeholder={placeholder} />
    </div>
  );
}
