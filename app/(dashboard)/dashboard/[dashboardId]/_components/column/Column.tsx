'use client';

import { ColumnHeader } from './ColumnHeader';

type ColumnProps = {
  columnId: number;
  title: string;
  cardCount: number;
  onAddCard: () => void;
  onEditColumn: () => void;
  onDeleteColumn: () => void;
  children: React.ReactNode;
};

export function Column({
  columnId,
  title,
  cardCount,
  onAddCard,
  onEditColumn,
  onDeleteColumn,
  children,
}: ColumnProps) {
  return (
    <div className="w-[335px] md:w-[464px] lg:w-[334px] shrink-0 flex flex-col h-full">
      <ColumnHeader
        title={title}
        cardCount={cardCount}
        onAddCard={onAddCard}
        onEditColumn={onEditColumn}
        onDeleteColumn={onDeleteColumn}
      />
      <div
        id={`column-scroll-${columnId}`}
        className="flex-1 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-[#5534DA] scrollbar-track-transparent"
      >
        {children}
      </div>
    </div>
  );
}
