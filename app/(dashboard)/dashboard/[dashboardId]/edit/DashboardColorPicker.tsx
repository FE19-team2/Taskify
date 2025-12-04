import React from 'react';
const COLORS = ['#c94b3f', '#b75a00', '#e0b500', '#2a8a5b', '#2f77ff'];

export default function DashboardColorPicker({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (color: string) => void;
}) {
  return (
    <>
      <div className="flex gap-4 items-center">
        {COLORS.map((color) => {
          const isSelected = selected === color;
          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelect(color)}
              aria-label={`색상 ${color}`}
              className={`w-[135px] h-[90px] rounded-xl transition-transform duration-150 ease-linear shrink-0
            ${isSelected ? 'border-[3px] border-[#e6eefc] shadow-[0_10px_30px_rgba(0,0,0,0.55)]' : 'border-[3px] border-transparent shadow-[0_6px_18px_rgba(0,0,0,0.45)]'}
            hover:-translate-y-1`}
              style={{ background: color }}
            />
          );
        })}
      </div>
    </>
  );
}
