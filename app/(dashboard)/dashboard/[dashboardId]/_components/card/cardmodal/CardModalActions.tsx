'use client';

import Image from 'next/image';
import EditMenu from './EditMenu';

type CardModalHeaderProps = {
  cardId: number;
  onClose: () => void;
  onEdit: () => void;
  onDeleteSuccess?: () => void;
  className?: string;
};

export function CardModalAction({
  cardId,
  onClose,
  onEdit,
  onDeleteSuccess,
  className,
}: CardModalHeaderProps) {
  return (
    <div className={`flex gap-5 items-center justify-center ${className ?? ''}`}>
      <EditMenu cardId={cardId} onDeleteSuccess={onDeleteSuccess || onClose} onEdit={onEdit} />
      <Image src="/images/X-icon.svg" alt="Close" width={16} height={16} onClick={onClose} />
    </div>
  );
}
