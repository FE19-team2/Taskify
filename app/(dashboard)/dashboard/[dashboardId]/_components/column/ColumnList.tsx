'use client';

import { Icon } from '@/components/ui/Icons/Icon';

type ColumnListProps = {
  dashboardTitle: string;
  children: React.ReactNode;
  onCreateColumn: () => void;
  onManageDashboard: () => void;
  onInviteMembers: () => void;
  columnCount: number;
  maxColumns?: number;
};

export function ColumnList({
  dashboardTitle,
  children,
  onCreateColumn,
  onManageDashboard,
  onInviteMembers,
  columnCount,
  maxColumns = 10,
}: ColumnListProps) {
  const canCreateColumn = columnCount < maxColumns;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 pt-4 border-b border-[#2F2F33] shrink-0">
        <h1 className="text-[18px] md:text-[20px] font-bold text-white">{dashboardTitle}</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={onInviteMembers}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2F2F33] hover:border-[#5534DA] transition-colors"
          >
            <Icon name="UserPlus" className="w-5 h-5 text-gray-500" />
            <span className="text-[14px] md:text-[16px] text-white">초대하기</span>
          </button>

          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onManageDashboard();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2F2F33] hover:border-[#5534DA] transition-colors cursor-pointer"
          >
            <Icon name="SettingIcon" className="w-5 h-5 text-gray-500" />
            <span className="text-[14px] md:text-[16px] text-white">관리</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden column-scroll-v2">
        <div className="flex gap-[60px] px-6 pt-6 h-full">
          {children}

          {canCreateColumn && (
            <button
              onClick={onCreateColumn}
              className="w-[335px] md:w-[464px] lg:w-[334px] shrink-0 h-[70px] flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#2F2F33] hover:border-[#5534DA] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Icon
                  name="PlusIcon"
                  className="w-[22px] h-[22px] text-[#A39FB2] hover:text-[#5534DA] transition-colors"
                />
                <div className="text-[16px] font-bold text-white group-hover:text-[#5534DA] transition-colors">
                  새로운 컬럼 추가
                </div>
              </div>
              {!canCreateColumn && (
                <span className="text-[12px] text-gray-500">
                  최대 {maxColumns}개까지 생성 가능합니다
                </span>
              )}
            </button>
          )}

          {!canCreateColumn && (
            <div className="w-[335px] md:w-[464px] lg:w-[334px] shrink-0 h-[70px] flex items-center justify-center rounded-lg border-2 border-dashed border-[#2F2F33] opacity-50">
              <span className="text-[14px] text-gray-500">최대 {maxColumns}개 컬럼 생성 완료</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
