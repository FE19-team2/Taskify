'use client';

import { useState, useRef, useEffect } from 'react';
import { ModalRoot } from '@/components/ui/modal/ModalRoot';
import { ModalHeader } from '@/components/ui/modal/components/Header';
import Input from '@/components/ui/input/Input';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import { createCard, updateCard } from '@/lib/api/services/cards.service';
import { uploadImage } from '@/lib/api/services/upload-image.service';
import { DialogModal } from '@/components/ui/modal/Dialog';
import { CardDto } from '@/lib/api/validations/cards';

interface CardCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: number;
  dashboardId: number;
  columns?: { id: number; title: string }[];
  members?: { id: number; nickname: string; profileImageUrl: string | null }[];
  dashboardTags?: string[];
  onCardCreated?: () => void;
  editMode?: boolean;
  cardData?: CardDto;
}

export default function CardCreateModal({
  open,
  onOpenChange,
  columnId,
  dashboardId,
  columns = [],
  members = [],
  dashboardTags = [],
  onCardCreated,
  editMode = false,
  cardData,
}: CardCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColumnId, setSelectedColumnId] = useState(columnId);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const columnDropdownRef = useRef<HTMLDivElement>(null);
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  // 편집 모드일 때 초기값 설정
  useEffect(() => {
    if (editMode && cardData && open) {
      setTitle(cardData.title);
      setDescription(cardData.description);
      setSelectedColumnId(cardData.columnId);
      setSelectedMemberId(cardData.assignee?.id || null);
      setDueDate(cardData.dueDate ? cardData.dueDate.split('T')[0] : '');
      setTags(cardData.tags || []);
      setExistingImageUrl(cardData.imageUrl || null);
      setImageFile(null);
    }
  }, [editMode, cardData, open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(event.target as Node)) {
        setIsColumnDropdownOpen(false);
      }
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target as Node)) {
        setIsMemberDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    if (isLoading) return;
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const resetForm = () => {
    if (!editMode) {
      setTitle('');
      setDescription('');
      setSelectedColumnId(columnId);
      setSelectedMemberId(null);
      setDueDate('');
      setTags([]);
      setImageFile(null);
      setExistingImageUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setDialogMessage('제목을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    if (!description.trim()) {
      setDialogMessage('설명을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      // 1. 이미지가 있으면 먼저 업로드
      let uploadedImageUrl: string | undefined = existingImageUrl || undefined;
      if (imageFile) {
        try {
          const uploadResponse = await uploadImage({
            columnId: selectedColumnId,
            file: imageFile,
          });
          uploadedImageUrl = uploadResponse.imageUrl;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          setDialogMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          setDialogOpen(true);
          setIsLoading(false);
          return;
        }
      }

      const cardPayload = {
        assigneeUserId: selectedMemberId || undefined,
        columnId: selectedColumnId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? dueDate : undefined,
        tags: tags.length > 0 ? tags : [],
        imageUrl: uploadedImageUrl,
      };

      if (editMode && cardData) {
        // 2-1. 카드 수정
        await updateCard(cardData.id, cardPayload);
        setDialogMessage('할 일이 수정되었습니다.');
      } else {
        // 2-2. 카드 생성
        await createCard({
          ...cardPayload,
          dashboardId,
        });
        setDialogMessage('할 일이 생성되었습니다.');
      }

      resetForm();
      onOpenChange(false);
      onCardCreated?.();
      setDialogOpen(true);
    } catch (error) {
      console.error(`카드 ${editMode ? '수정' : '생성'} 실패:`, error);
      setDialogMessage(`할 일 ${editMode ? '수정' : '생성'}에 실패했습니다. 다시 시도해주세요.`);
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalRoot open={open} onOpenChange={handleOpenChange} size="lg" closeOnOutside={false}>
        <div className="flex flex-col p-5 md:p-7 text-[#D6D5D9]">
          <ModalHeader title={editMode ? '할 일 수정' : '할 일 생성'} onClose={handleClose} />

          <div className="flex flex-col gap-6 mt-6">
            {/* 제목 */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[#D6D5D9] font-medium">제목 *</label>
              <Input
                value={title}
                onChange={setTitle}
                placeholder="제목을 입력해주세요"
                disabled={isLoading}
              />
            </div>

            {/* 설명 */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[#D6D5D9] font-medium">설명 *</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="설명을 입력해주세요"
                disabled={isLoading}
                className="w-full min-h-[120px] rounded-[14px] border border-[#524F5B] bg-[#201F23] px-5 py-3.5 text-[#F8F7FA] placeholder:text-[#A39FB2] focus:border-[#76A5EA] outline-none resize-none"
              />
            </div>

            {/* 칼럼과 담당자 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 칼럼 선택 */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#D6D5D9] font-medium">칼럼 *</label>
                <div className="relative" ref={columnDropdownRef}>
                  <button
                    type="button"
                    onClick={() => !isLoading && setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-[#524F5B] bg-[#201F23] px-5 py-3.5 text-left text-[#F8F7FA] focus:border-[#76A5EA] focus:ring-2 focus:ring-[#76A5EA]/20 outline-none cursor-pointer hover:border-[#76A5EA]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                  >
                    <span>{columns.find((col) => col.id === selectedColumnId)?.title}</span>
                    <svg
                      className={`w-5 h-5 text-[#A39FB2] transition-transform ${isColumnDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 8l4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isColumnDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#201F23] border border-[#524F5B] rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                      <div className="max-h-60 overflow-y-auto py-1">
                        {columns.map((col) => (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => {
                              setSelectedColumnId(col.id);
                              setIsColumnDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left transition-colors ${
                              selectedColumnId === col.id
                                ? 'bg-[#76A5EA] text-white'
                                : 'text-[#F8F7FA] hover:bg-[#2a2930]'
                            }`}
                          >
                            {col.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 담당자 선택 */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#D6D5D9] font-medium">담당자</label>
                <div className="relative" ref={memberDropdownRef}>
                  <button
                    type="button"
                    onClick={() => !isLoading && setIsMemberDropdownOpen(!isMemberDropdownOpen)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-[#524F5B] bg-[#201F23] px-5 py-3.5 text-left text-[#F8F7FA] focus:border-[#76A5EA] focus:ring-2 focus:ring-[#76A5EA]/20 outline-none cursor-pointer hover:border-[#76A5EA]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                  >
                    <span>
                      {selectedMemberId
                        ? members.find((mm) => mm.id === selectedMemberId)?.nickname
                        : '담당자 선택'}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#A39FB2] transition-transform ${isMemberDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 8l4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isMemberDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#201F23] border border-[#524F5B] rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                      <div className="max-h-60 overflow-y-auto py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMemberId(null);
                            setIsMemberDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left transition-colors ${
                            selectedMemberId === null
                              ? 'bg-[#76A5EA] text-white'
                              : 'text-[#F8F7FA] hover:bg-[#2a2930]'
                          }`}
                        >
                          담당자 선택
                        </button>
                        {members.map((member) => (
                          <button
                            key={member.id}
                            type="button"
                            onClick={() => {
                              setSelectedMemberId(member.id);
                              setIsMemberDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left transition-colors ${
                              selectedMemberId === member.id
                                ? 'bg-[#76A5EA] text-white'
                                : 'text-[#F8F7FA] hover:bg-[#2a2930]'
                            }`}
                          >
                            {member.nickname}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 태그 */}
            <TagInput tags={tags} dashboardTags={dashboardTags} onTagsChange={setTags} />

            {/* 마감일 */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[#D6D5D9] font-medium">마감일</label>
              <Input
                type="date"
                value={dueDate}
                onChange={setDueDate}
                placeholder="날짜를 입력해주세요"
                disabled={isLoading}
              />
            </div>

            {/* 이미지 업로드 */}
            <ImageUpload
              file={imageFile}
              onFileChange={setImageFile}
              existingImageUrl={existingImageUrl}
            />

            {/* 버튼 */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-[#2F2F33] text-white hover:bg-[#3F3F43] transition disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-[#00C853] text-white hover:bg-[#00B34A] transition disabled:opacity-50"
              >
                {isLoading ? (editMode ? '수정 중...' : '생성 중...') : editMode ? '수정' : '생성'}
              </button>
            </div>
          </div>
        </div>
      </ModalRoot>

      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </>
  );
}
