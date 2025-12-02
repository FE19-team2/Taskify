'use client';

import Image from 'next/image';
import EditMenu from './EditMenu';

type CardModalHeaderProps = {
  cardId: number;
  onEdit: () => void;
  onClose: () => void;
};

export function CardModalHeaderActions({ cardId, onEdit, onClose }: CardModalHeaderProps) {
  return (
    <div className="flex gap-5 items-center justify-center lg:hidden">
      <EditMenu cardId={cardId} onEdit={onEdit} onDeleteSuccess={onClose} />
      <Image src="/images/X-icon.svg" alt="Close" width={16} height={16} onClick={onClose} />
    </div>
  );
}
