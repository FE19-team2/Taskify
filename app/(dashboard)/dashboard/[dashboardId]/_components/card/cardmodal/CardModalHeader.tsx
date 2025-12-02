'use client';

import { CardModalHeaderActions } from './CardModalHeaderActions';

type CardModalHeaderProps = {
  title: string;
  cardId: number;
  onEdit: () => void;
  onClose: () => void;
};

export function CardModalHeader({ title, cardId, onEdit, onClose }: CardModalHeaderProps) {
  return (
    <div className="flex w-full justify-between">
      <h2 className="font-semibold text-[20px] md:text-24px">{title}</h2>
      <CardModalHeaderActions cardId={cardId} onEdit={onEdit} onClose={onClose} />
    </div>
  );
}
