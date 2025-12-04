'use client';

import { useState, KeyboardEvent } from 'react';
import { Tag } from '../Tag';

type TagInputProps = {
  tags?: string[];
  dashboardTags?: string[];
  onTagsChange?: (tags: string[]) => void;
};

export default function TagInput({
  tags: initialTags,
  dashboardTags,
  onTagsChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags ?? []);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const trimmed = inputValue.trim();

  const filteredOptions = trimmed
    ? (dashboardTags?.filter((name) => name.includes(trimmed) && !tags.includes(name)) ?? [])
    : (dashboardTags?.filter((name) => !tags.includes(name)) ?? []);

  const canCreateNew = trimmed && !tags.includes(trimmed);
  const shouldShowOptions = isFocused && (canCreateNew || filteredOptions.length > 0);

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value) return;

    if (tags.includes(value)) {
      setInputValue('');
      return;
    }
    const newTags = [...tags, value];
    setTags(newTags);
    onTagsChange?.(newTags);
    setInputValue('');
  };

  const handleClickCreate = () => {
    if (!canCreateNew) return;
    addTag(trimmed);
  };

  const handleClickOption = (name: string) => {
    if (tags.includes(name)) return;
    addTag(name);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(inputValue);
      return;
    }

    if (event.key === 'Backspace' && !inputValue && tags.length) {
      event.preventDefault();
      const newTags = tags.slice(0, tags.length - 1);
      setTags(newTags);
      onTagsChange?.(newTags);
      return;
    }
  };

  return (
    <div className="relative flex flex-col gap-2.5 md:gap-3">
      <label className="text-[#D6D5D9]">태그</label>
      <div
        className="
          w-full rounded-[14px] border border-[#524F5B]
          bg-[#201F23] px-5 py-1.5 text-[#F8F7FA]
          focus-within:border-[#76A5EA]
          h-[54px]
          
          flex flex-wrap items-center gap-2
        "
      >
        {tags.map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
        <input
          name="tag Input"
          type="text"
          value={inputValue}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="태그를 입력해주세요"
          className="
            flex-1 min-w-[120px]
            bg-transparent border-none outline-none
            text-[#F8F7FA]
            placeholder:text-[#A39FB2]
          "
        />
      </div>
      {shouldShowOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10 w-full flex flex-col gap-2 px-3.5 py-2 border border-[#524F5B] rounded-xl bg-[#201F23]">
          <span className="text-[12px]">옵션 선택 또는 생성</span>
          {filteredOptions.length > 0 && (
            <div
              className={`flex flex-col gap-2 ${filteredOptions.length > 6 ? 'max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#524F5B] scrollbar-track-transparent hover:scrollbar-thumb-[#76A5EA]' : ''}`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#524F5B transparent',
              }}
            >
              {filteredOptions.map((name) => (
                <button
                  key={name}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleClickOption(name);
                  }}
                  className="inline-flex items-center gap-2 text-xs text-[#F8F7FA]"
                >
                  <Tag name={name} />
                </button>
              ))}
            </div>
          )}

          {canCreateNew && (
            <>
              <button
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleClickCreate();
                }}
                className="inline-flex items-center gap-2 text-xs text-[#F8F7FA]"
              >
                <span className="px-2 py-0.5 text-[13px]">생성</span>
                <Tag name={trimmed} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
