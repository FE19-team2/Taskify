'use client';

import { useState } from 'react';
import { Client } from '@/lib/api/client/api-client';
import { DialogModal } from '@/components/ui/modal/Dialog';

interface PasswordChangeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasswordChangeModal({ onClose, onSuccess }: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setDialogMessage('모든 필드를 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setDialogMessage('새 비밀번호가 일치하지 않습니다.');
      setDialogOpen(true);
      return;
    }

    if (newPassword.length < 8) {
      setDialogMessage('비밀번호는 8자 이상이어야 합니다.');
      setDialogOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await Client.put('/auth/password', {
        password: currentPassword,
        newPassword: newPassword,
      });
      setDialogMessage('비밀번호가 변경되었습니다.');
      setDialogOpen(true);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      setDialogMessage('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-lg p-6 w-[480px] max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            ← 비밀번호 변경
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 현재 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="현재 비밀번호 입력"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="새 비밀번호 입력"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 새 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="새 비밀번호 입력"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition disabled:opacity-50"
            >
              {isSubmitting ? '변경 중...' : '변경'}
            </button>
          </div>
        </form>
      </div>

      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </div>
  );
}
