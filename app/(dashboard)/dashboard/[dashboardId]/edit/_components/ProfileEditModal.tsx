'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { updateUserProfile } from '@/lib/api/services/users.service';
import { uploadImage } from '@/lib/api/services/upload-image.service';
import { User } from '@/lib/api/validations/users';
import { DialogModal } from '@/components/ui/modal/Dialog';

interface ProfileEditModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProfileEditModal({ user, onClose, onSuccess }: ProfileEditModalProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setDialogMessage('파일 크기는 5MB 이하여야 합니다.');
      setDialogOpen(true);
      return;
    }

    // 이미지 파일 형식 체크
    if (!file.type.startsWith('image/')) {
      setDialogMessage('이미지 파일만 업로드 가능합니다.');
      setDialogOpen(true);
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadImage({ file });
      console.log('Upload response:', response);
      if (response.profileImageUrl) {
        setProfileImageUrl(response.profileImageUrl);
        setDialogMessage('이미지가 업로드되었습니다.');
        setDialogOpen(true);
      } else if (response.imageUrl) {
        setProfileImageUrl(response.imageUrl);
        setDialogMessage('이미지가 업로드되었습니다.');
        setDialogOpen(true);
      } else {
        console.error('No image URL in response:', response);
        setDialogMessage('이미지 URL을 받지 못했습니다.');
        setDialogOpen(true);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setDialogMessage(`이미지 업로드에 실패했습니다: ${errorMessage}`);
      setDialogOpen(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nickname.trim()) {
      setDialogMessage('닉네임을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUserProfile({
        nickname: nickname.trim(),
        profileImageUrl: profileImageUrl.trim() || null,
      });
      setDialogMessage('프로필이 변경되었습니다.');
      setDialogOpen(true);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      setDialogMessage('프로필 변경에 실패했습니다.');
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] rounded-lg p-6 w-[480px] max-w-[90vw]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">프로필 변경</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 프로필 이미지 미리보기 */}
          <div className="flex items-center gap-4 mb-6">
            {profileImageUrl ? (
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image src={profileImageUrl} alt="프로필" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-white text-2xl font-bold">
                {nickname.charAt(0) || 'U'}
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
              >
                {isUploading ? '업로드 중...' : '사진 변경'}
              </button>
              <button
                type="button"
                onClick={() => setProfileImageUrl('')}
                disabled={isUploading}
                className="px-4 py-2 text-red-400 hover:text-red-300 transition disabled:opacity-50"
              >
                사진 삭제
              </button>
            </div>
          </div>

          {/* 이메일 (읽기 전용) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-3 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* 닉네임 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="닉네임"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* 비밀번호 변경 버튼 */}
          <button
            type="button"
            onClick={() => {
              onClose();
              // 비밀번호 변경 모달 열기 이벤트 발생
              window.dispatchEvent(new CustomEvent('openPasswordModal'));
            }}
            className="w-full mb-4 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            비밀번호 변경
          </button>

          {/* 하단 버튼 */}
          <div className="flex gap-3">
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
              disabled={isSubmitting || isUploading}
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
