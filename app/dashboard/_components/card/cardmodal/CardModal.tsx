'use client';

import { ModalRoot } from '@/components/ui/modal/ModalRoot';

type CardModalProps = {
  data: CardData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate?: string;
  assignee?: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

export function CardModal({ data, open, onOpenChange }: CardModalProps) {
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <h2>{data.title}</h2>
    </ModalRoot>
  );
}
