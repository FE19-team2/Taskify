'use client';

import Input from '../../input/Input';

export function ModalInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="mb-[30px]">
      <Input placeholder={placeholder} />
    </div>
  );
}
