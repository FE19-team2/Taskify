'use client';

import Image from 'next/image';

export function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex justify-between pb-4 md:mb-2.5 md:pb-[18px] ">
      <h1 className="text-[18px] text-semibold md:text-[24px]">{title}</h1>
      <Image src="/images/X-icon.svg" alt="Close" width={16} height={16} onClick={onClose} />
    </div>
  );
}
