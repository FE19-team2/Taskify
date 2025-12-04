'use client';

import { CardDto } from '@/lib/api/validations/cards';
import { useDroppable } from '@dnd-kit/core';
import { useEffect, useRef, useCallback } from 'react';
import { ColumnCard } from './ColumnCard';

type ColumnCardListProps = {
  columnId: number;
  cards: CardDto[];
  hasMore: boolean;
  loadMore: () => void;
  onCardClick: (card: CardDto) => void;
};

export function ColumnCardList({
  columnId,
  cards,
  hasMore,
  loadMore,
  onCardClick,
}: ColumnCardListProps) {
  const { setNodeRef } = useDroppable({
    id: `column-${columnId}`,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollContainer = document.getElementById(`column-scroll-${columnId}`);
    if (!scrollContainer || loadingRef.current || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    // 스크롤이 하단 100px 이내로 왔을 때 추가 로드
    if (scrollHeight - scrollTop - clientHeight < 100) {
      loadingRef.current = true;
      loadMore();
      setTimeout(() => {
        loadingRef.current = false;
      }, 500);
    }
  }, [columnId, hasMore, loadMore]);

  useEffect(() => {
    const scrollContainer = document.getElementById(`column-scroll-${columnId}`);
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [columnId, handleScroll]);

  if (cards.length === 0) {
    return (
      <div ref={setNodeRef} className="flex items-center justify-center min-h-[400px]">
        <p className="text-[14px] text-gray-500">등록된 카드가 없습니다</p>
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (scrollRef.current !== node) {
          scrollRef.current = node;
        }
      }}
      className="pb-4"
    >
      {cards.map((card, index) => (
        <div key={card.id}>
          <DropZone columnId={columnId} position={index} />
          <ColumnCard card={card} onClick={() => onCardClick(card)} />
        </div>
      ))}
      <DropZone columnId={columnId} position={cards.length} />
      {hasMore && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-[#5534DA] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

function DropZone({ columnId, position }: { columnId: number; position: number }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-${columnId}-${position}`,
    data: { columnId, position },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-3 transition-all ${
        isOver ? 'h-8 bg-[#5534DA]/20 border-2 border-dashed border-[#5534DA] rounded' : ''
      }`}
    />
  );
}
