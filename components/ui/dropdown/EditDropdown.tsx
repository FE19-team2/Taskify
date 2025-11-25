'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils/twmerge';
import { Icon, IconName } from '../Icons/Icon';
import { IconMap } from '../Icons/IconMap';

interface Option {
  label: string;
  value: 'edit' | 'delete';
  IconName: 'EditIcon' | 'DeleteIcon';
  colorClass?: string;
}

interface EditDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: 'edit' | 'delete') => void;
}

const editOptions: Option[] = [
  {
    label: '수정하기',
    value: 'edit',
    IconName: `EditIcon`,
    colorClass: 'text-gray-100',
  },
  {
    label: '삭제하기',
    value: 'delete',
    IconName: `DeleteIcon`,
    colorClass: 'text-red-500 hover:text-red-400',
  },
];

const EditDropdown: FC<EditDropdownProps> = ({ isOpen, onToggle, onSelect }) => {
  const ButtonIcon: IconName = `SettingIcon`;
  const buttonLabel = '관리';

  return (
    <div className="relative inline-block ">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-[105px] h-[54px] flex justify-between items-center px-5 py-1.5 rounded-[14px] transition',
          !isOpen && 'bg-black-400 border border-gray-500 text-gray-200 hover:bg-gray-700',
          isOpen && 'bg-gray-700 text-gray-100 ring-2 ring-gray-500',
        )}
      >
        <span className="flex items-center space-x-1 ">
          {ButtonIcon && (
            <Icon
              name={ButtonIcon}
              className={cn(
                'w-4 h-4 transition-colors duration-200 bg-transparent',
                !isOpen && 'text-gray-200',
                isOpen && 'text-gray-100',
              )}
            />
          )}
          <span>{buttonLabel}</span>
        </span>
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute w-32 h-[114px]  mt-2 shadow-lg z-50',
            'px-2.5 py-2.5 rounded-[14px] bg-black-400 border border-gray-500',
            '-left-5',
          )}
        >
          {editOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={cn(
                'flex items-center  px-2.5 py-3 hover:bg-gray-700 cursor-pointer rounded-[10px]',
                opt.colorClass,
              )}
            >
              <Icon name={opt.IconName} className="w-4 h-4" />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditDropdown;
