'use client';

import { useState } from 'react';
import { getRandomHexColor } from '@/lib/utils/get-random-hex-color';

export function Tag({ name }: { name: string }) {
  const [bgColor] = useState(() => getRandomHexColor());
  return (
    <p
      style={{ backgroundColor: bgColor }}
      className="px-1.5 py-1 text-[13px] font-semibold rounded-md text-white"
    >
      {name}
    </p>
  );
}
