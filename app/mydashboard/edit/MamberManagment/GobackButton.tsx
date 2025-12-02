'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GoBackButton() {
  return (
    <Link
      href="/mydashboard"
      className="absolute top-1 right-0 rounded-full transition duration-150 text-white flex flex-col items-center justify-center"
      style={{ width: '48px' }}
      aria-label="돌아가기"
    >
      <div className="flex items-center justify-center bg-transparent mt-1 p-1.5 border-2 border-white rounded-full">
        <Image src="/images/X-icon.svg" alt="돌아가기 아이콘" width={40} height={40} />
      </div>

      <p className="text-sm  truncate">돌아가기</p>
    </Link>
  );
}
