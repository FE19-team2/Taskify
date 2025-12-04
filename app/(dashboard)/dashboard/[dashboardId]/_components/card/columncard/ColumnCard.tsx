'use client';

import { CardDto } from '@/lib/api/validations/cards';
import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Tag } from '../Tag';
import { formatKoreanDate } from '@/lib/utils/format-date';

type ColumnCardProps = {
  card: CardDto;
  onClick: () => void;
};

export function ColumnCard({ card, onClick }: ColumnCardProps) {
  const { title, tags, dueDate, assignee, imageUrl, id } = card;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="w-full">
      <div
        className="w-full rounded-lg bg-[#1F1F23] border border-[#2F2F33] hover:border-[#5534DA] transition-colors cursor-pointer relative overflow-hidden"
        onClick={onClick}
      >
        <div
          {...listeners}
          className="absolute top-2 right-2 w-6 h-6 cursor-grab active:cursor-grabbing z-20 flex items-center justify-center hover:opacity-70 bg-black/50 rounded"
          onClick={(evt) => evt.stopPropagation()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="4" r="1.5" fill="#9CA3AF" />
            <circle cx="13" cy="4" r="1.5" fill="#9CA3AF" />
            <circle cx="7" cy="10" r="1.5" fill="#9CA3AF" />
            <circle cx="13" cy="10" r="1.5" fill="#9CA3AF" />
            <circle cx="7" cy="16" r="1.5" fill="#9CA3AF" />
            <circle cx="13" cy="16" r="1.5" fill="#9CA3AF" />
          </svg>
        </div>
        {imageUrl && (
          <div className="w-full h-40 relative">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-[14px] md:text-[16px] font-medium text-white mb-2 line-clamp-2">
            {title}
          </h3>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, index) => (
                <Tag key={index} name={tag} />
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {dueDate && (
              <div className="flex items-center gap-1.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.25 2.8125H12.9375V2.25C12.9375 2.05109 12.8585 1.86032 12.7169 1.71967C12.5753 1.57902 12.3845 1.5 12.1875 1.5C11.9906 1.5 11.7998 1.57902 11.6581 1.71967C11.5165 1.86032 11.4375 2.05109 11.4375 2.25V2.8125H6.5625V2.25C6.5625 2.05109 6.48348 1.86032 6.34183 1.71967C6.20018 1.57902 6.00942 1.5 5.8125 1.5C5.61558 1.5 5.42482 1.57902 5.28317 1.71967C5.14152 1.86032 5.0625 2.05109 5.0625 2.25V2.8125H3.75C3.35218 2.8125 2.97064 2.97103 2.68934 3.25233C2.40804 3.53363 2.25 3.91518 2.25 4.3125V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H14.25C14.6478 15.75 15.0294 15.592 15.3107 15.3107C15.592 15.0294 15.75 14.6478 15.75 14.25V4.3125C15.75 3.91518 15.592 3.53363 15.3107 3.25233C15.0294 2.97103 14.6478 2.8125 14.25 2.8125ZM14.25 14.25H3.75V7.5H14.25V14.25Z"
                    fill="#787486"
                  />
                </svg>
                <span className="text-[12px] text-gray-500">{formatKoreanDate(dueDate)}</span>
              </div>
            )}

            {assignee && (
              <div className="flex items-center gap-2">
                {assignee.profileImageUrl ? (
                  <Image
                    src={assignee.profileImageUrl}
                    alt={assignee.nickname}
                    width={20}
                    height={20}
                    className="rounded-full border border-[#2F2F33]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#2F2F33] border border-gray-500 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">{assignee.nickname[0]}</span>
                  </div>
                )}
                <span className="text-[12px] text-gray-500">{assignee.nickname}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
