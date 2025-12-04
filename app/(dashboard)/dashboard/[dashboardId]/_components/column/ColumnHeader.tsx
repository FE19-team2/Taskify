'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icons/Icon';

type ColumnHeaderProps = {
  title: string;
  cardCount: number;
  onAddCard: () => void;
  onEditColumn: () => void;
  onDeleteColumn: () => void;
};

export function ColumnHeader({
  title,
  cardCount,
  onAddCard,
  onEditColumn,
  onDeleteColumn,
}: ColumnHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdownSelect = (value: 'edit' | 'delete') => {
    setIsDropdownOpen(false);
    if (value === 'edit') {
      onEditColumn();
    } else if (value === 'delete') {
      onDeleteColumn();
    }
  };

  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-[16px] md:text-[18px] font-bold text-white">{title}</h2>
        <div className="flex items-center justify-center w-5 h-5 rounded">
          <span className="text-[14px] font-medium text-gray-500">{cardCount}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onAddCard}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="카드 추가"
        >
          <Icon name="PlusIcon" className="w-[22px] h-[22px] text-brand-500" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(evt) => {
              evt.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="컬럼 관리"
          >
            <Icon name="SettingIcon" className="w-[22px] h-[22px] text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-black-400 border border-gray-500 rounded-lg shadow-lg z-50">
              <button
                onClick={(evt) => {
                  evt.stopPropagation();
                  handleDropdownSelect('edit');
                }}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-700 text-gray-100 transition-colors first:rounded-t-lg"
              >
                <Icon name="EditIcon" className="w-4 h-4" />
                <span className="text-[14px]">수정하기</span>
              </button>
              <button
                onClick={(evt) => {
                  evt.stopPropagation();
                  handleDropdownSelect('delete');
                }}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-700 text-red-500 hover:text-red-400 transition-colors last:rounded-b-lg"
              >
                <Icon name="DeleteIcon" className="w-4 h-4" />
                <span className="text-[14px]">삭제하기</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
