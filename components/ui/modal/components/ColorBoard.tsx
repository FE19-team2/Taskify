'use client';

import { useState } from 'react';
import { useConfirmModalStore } from '../ConfirmModalStore';

type Color = {
  name: string;
  hexCode: '#ae2e24' | '#9f4b00' | '#bd8c00' | '#206e4e' | '#1458bc';
};

const COLORS: Color[] = [
  { name: 'rose', hexCode: '#ae2e24' },
  { name: 'orange', hexCode: '#9f4b00' },
  { name: 'yellow', hexCode: '#bd8c00' },
  { name: 'green', hexCode: '#206e4e' },
  { name: 'cobalt', hexCode: '#1458bc' },
];

export function ColorBoard() {
  const setColor = useConfirmModalStore((state) => state.setColor);

  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);

  const handleSelectColor = (color: Color) => {
    setSelectedColor(color.name);
    setColor(color.hexCode);
  };

  return (
    <div className="mb-10">
      <h2 className="text-[14px] mb-3 md:text-[16px] font-semibold text-[#D6D5D9]">색상</h2>
      <div className="flex w-full justify-between">
        {COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => handleSelectColor(color)}
            style={{ backgroundColor: color.hexCode }}
            className={`w-13 md:w-24 h-10 md:h-15 rounded-[10px] md:rounded-2xl ${
              selectedColor === color.name
                ? 'border-2 border-[#76A5EA]'
                : 'border-2 border-transparent'
            }`}
            aria-label={`${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
}
