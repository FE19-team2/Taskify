'use client';

import { ConfirmWithInputModal } from '@/components/ui/modal/ConfirmWithInputModal';
import { useConfirmModalStore } from '@/components/ui/modal/ConfirmModalStore';
import { useState } from 'react';
import { createDashboard } from '@/lib/api/services/dashboards.service';
import { HttpError } from '@/lib/api/request-core';
import { DialogModal } from '@/components/ui/modal/Dialog';

export function CreateDashboardModal() {
  const { dashboardTitle, color, setTitle } = useConfirmModalStore();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleConfirm = async () => {
    try {
      await createDashboard({ title: dashboardTitle, color });
      setMessage('대시보드가 생성되었습니다.');
      setIsDialogOpen(true);
    } catch (error) {
      if (error instanceof HttpError) {
        setMessage(error.message);
        setIsDialogOpen(true);
      } else {
        setMessage('대시보드 생성에 실패했습니다.');
        setIsDialogOpen(true);
      }
    }
  };

  return (
    <>
      <ConfirmWithInputModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onChange={setTitle}
        title="새 대시보드 생성"
        placeholder="새로운 대시보드"
        confirmText="생성"
        cancelText="취소"
        onConfirm={handleConfirm}
        hasColorBoard={true}
        isLoading={false}
      />
      <DialogModal
        open={isDialogOpen}
        onClose={setIsModalOpen}
        onOpenChange={setIsDialogOpen}
        description={message}
      />
    </>
  );
}
