'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { sendDashboardInvitation } from '@/lib/api/services/dashboards.service';
import { HttpError } from '@/lib/api/request-core';
import { DialogModal } from '@/components/ui/modal/Dialog';

interface InviteMemberModalProps {
  dashboardId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InviteMemberModal({
  dashboardId,
  onClose,
  onSuccess,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await sendDashboardInvitation(dashboardId, { email: email.trim() });
      setDialogMessage('초대가 성공적으로 전송되었습니다.');
      setDialogOpen(true);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('초대 전송에 실패했습니다:', err);

      // API 에러 메시지 처리
      let errorMessage;

      if (err instanceof HttpError) {
        errorMessage = err?.message || err?.message || '초대 전송에 실패했습니다.';
      }

      if (
        errorMessage?.includes('존재하지') ||
        errorMessage?.includes('not found') ||
        errorMessage?.includes('404')
      ) {
        setError('존재하지 않는 이메일입니다. 이메일을 확인해주세요.');
      } else if (errorMessage?.includes('이미') || errorMessage?.includes('already')) {
        setError('이미 초대되었거나 멤버인 사용자입니다.');
      } else {
        setError(errorMessage || null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-lg p-6 w-[400px] max-w-[90vw]">
        <h2 className="text-xl font-bold text-white mb-4">멤버 초대</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="초대할 멤버의 이메일을 입력하세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#171717] text-white focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? '초대중...' : '초대'}
            </Button>
          </div>
        </form>
      </div>

      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </div>
  );
}
