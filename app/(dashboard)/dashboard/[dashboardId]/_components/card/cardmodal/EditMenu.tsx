'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { deleteCard } from '@/lib/api/services/cards.service';
import { HttpError } from '@/lib/api/request-core';
import { DialogModal } from '@/components/ui/modal/Dialog';
import { DeleteAlert } from '@/components/ui/modal/DeleteAlert';

type EditMenuProps = {
  cardId: number;
  onEdit: () => void;
  onDeleteSuccess: () => void;
};

export default function EditMenu({ cardId, onEdit, onDeleteSuccess }: EditMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isDialogOpen && isDeleteSuccess) {
      onDeleteSuccess();
    }
  }, [isDialogOpen, isDeleteSuccess, onDeleteSuccess]);

  const handleEdit = async () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      await deleteCard(cardId);
      setDialogMessage('카드가 삭제되었습니다.');
      setIsDeleteSuccess(true);
      setIsDialogOpen(true);
    } catch (error) {
      setDialogMessage(
        (error as HttpError).message || '카드 삭제에 실패했습니다. 다시 시도해주세요.',
      );
      setIsDialogOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="relative w-6 h-6" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full flex items-center justify-center"
        >
          ⋯
        </button>

        {isOpen && (
          <div className="absolute right-0 top-[30px] flex flex-col gap-2.5 px-2.5 py-3 bg-[#2f2f33] border border-bg-stroke rounded-[20px]">
            <button
              onClick={handleEdit}
              disabled={isDeleting}
              className="flex items-center justify-center px-3 py-2.5 min-w-[108px] max-h-10 hover:cursor-pointer"
            >
              <Image src="/images/edit.svg" alt="Edit" width={16} height={16} className="mr-2" />
              수정하기
            </button>
            <button
              onClick={handleDeleteClick}
              className="flex items-center justify-center text-[#CA372B] px-3 py-2.5 min-w-[108px] max-h-10 hover:cursor-pointer"
            >
              <Image
                src="/images/delete.svg"
                alt="Delete"
                width={16}
                height={16}
                className="mr-2"
              />
              삭제하기
            </button>
          </div>
        )}
      </div>
      {isDeleteAlertOpen && (
        <DeleteAlert
          open={isDeleteAlertOpen}
          onOpenChange={setIsDeleteAlertOpen}
          title="카드 삭제"
          description="정말 이 카드를 삭제하시겠습니까?"
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
          isDelete={true}
        />
      )}
      {isDialogOpen && (
        <DialogModal
          description={dialogMessage}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}
