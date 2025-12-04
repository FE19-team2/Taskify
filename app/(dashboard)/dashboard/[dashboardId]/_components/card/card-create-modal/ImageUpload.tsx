'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingImageUrl?: string | null;
}

export default function ImageUpload({ file, onFileChange, existingImageUrl }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // file prop이 변경되면 previewUrl 업데이트
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      // 비동기로 상태 업데이트
      const timeoutId = setTimeout(() => {
        setPreviewUrl(objectUrl);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      // existingImageUrl나 null도 비동기로 처리
      const timeoutId = setTimeout(() => {
        setPreviewUrl(existingImageUrl || null);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [file, existingImageUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // 파일 크기 체크 (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 체크
    if (!selectedFile.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 미리보기 URL 생성 및 파일 변경 알림
    onFileChange(selectedFile);
  };

  const handleRemoveImage = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[#D6D5D9] font-medium">이미지</label>

      {previewUrl ? (
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden border-2 border-[#524F5B] group">
          <Image src={previewUrl} alt="선택된 이미지" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClickUpload}
          className="w-full h-[200px] rounded-xl border-2 border-dashed border-[#524F5B] bg-[#201F23] hover:border-[#76A5EA] transition flex flex-col items-center justify-center gap-3"
        >
          <div className="w-16 h-16 rounded-full bg-[#2F2F33] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#76A5EA]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-[#76A5EA] text-sm">+ image upload</span>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
