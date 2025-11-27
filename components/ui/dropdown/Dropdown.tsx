'use client';

import { FC } from 'react'; // icon의 타입을 정의하기 위해 남겨두었습니다
import type { SVGProps } from 'react'; // Icon은 SVG 아이콘 부품이어야한다 라는 타입 정의
import { cn } from '@/lib/utils/twmerge';
import { Icon, IconName } from '../Icons/Icon';
import { UserAvatar } from './UserAvatar';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  isOpen: boolean;
  options: Option[];
  onToggle: () => void;
  onSelect: (value: string) => void;
  icon?: FC<SVGProps<SVGSVGElement>>;
}

const Dropdown: FC<DropdownProps> = ({ label, isOpen, options, onToggle, onSelect, icon }) => {
  return (
    <div className="relative inline-block ">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full h-full flex justify-between items-center px-5 py-1.5 rounded-[14px] transition',
          !isOpen &&
            'bg-black-400 border border-gray-500 text-gray-200 hover:bg-gray-700 hover:border hover:border-gray-50 hover:text-gray-100',
          isOpen && 'bg-black-400 text-gray-100 ring-2 ring-gray-500 border border-gray-200',
        )}
      >
        <span>{label}</span>

        <Icon
          name="ArrowDown"
          className={cn(
            'w-[18px] h-[18px] transition-transform duration-200 text-gray-200 hover:text-white ',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute w-[260px] h-[252px] overflow-y-auto mt-2 shadow-lg z-50 -left-38',
            'px-1 py-2.5 rounded-[14px] bg-black-400 border border-gray-500',
          )}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              onClick={() => onSelect(opt.value)}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-200 rounded-[10px]"
            >
              <UserAvatar name={opt.label} />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
