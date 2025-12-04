'use client';

import { useState, useRef, useEffect } from 'react';
import { useCommentStore } from './UseCommentStore';
import Image from 'next/image';
import { getDefaultProfileImage } from '@/lib/utils/get-default-profile-image';

export function CommentInput() {
  const { author, content } = useCommentStore();
  const [value, setValue] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageUrl = author.profileImageUrl || getDefaultProfileImage(author.nickName);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    if (!content) {
      setValue('');
    }
  };

  const handleCancel = () => {
    if (content) {
      setValue(content);
    } else {
      setValue('');
    }
    setIsFocused(false);
  };

  const handleInputClick = () => {
    setIsFocused(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div className="relative w-full">
      <style>{`
        .comment-textarea::-webkit-scrollbar {
          width: 6px;
        }
        .comment-textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        .comment-textarea::-webkit-scrollbar-thumb {
          background: #524F5B;
          border-radius: 3px;
        }
        .comment-textarea::-webkit-scrollbar-thumb:hover {
          background: #76A5EA;
        }
      `}</style>
      {!isFocused && (
        <div className="flex w-full gap-3 items-center">
          <Image
            src={imageUrl}
            alt={`${author.nickName}의 프로필 이미지`}
            width={30}
            height={30}
            className="rounded-full mt-1 shrink-0"
          />
          <div className="relative flex-1">
            <input
              type="text"
              onClick={handleInputClick}
              placeholder="댓글을 남겨보세요"
              className="px-5 py-2.5 w-full rounded-full border border-[#A39FB2] bg-transparent text-[#F8F7FA] placeholder:text-[#A39FB2]"
              readOnly
            />
          </div>
        </div>
      )}
      {isFocused && (
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={(event) => {
              if (
                !event.relatedTarget ||
                !event.currentTarget.parentElement?.parentElement?.contains(event.relatedTarget)
              ) {
                setIsFocused(false);
              }
            }}
            placeholder="댓글을 남겨보세요"
            className="comment-textarea p-5 w-full rounded-[14px] resize-none border border-[#76A5EA] pb-12 min-h-[110px] bg-transparent text-[#F8F7FA] placeholder:text-[#A39FB2]"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#524F5B transparent' }}
          />
          <div className="absolute bottom-2 mb-5 right-2 flex gap-2">
            <button
              type="button"
              className="w-[68px] h-9 rounded-full bg-[#3C3C41]"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              type="button"
              className="w-[68px] h-9 rounded-full bg-[#00A200]"
              onClick={handleSubmit}
              disabled={!value.trim()}
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
