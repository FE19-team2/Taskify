import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icons/Icon';
import { cn } from '@/lib/utils/twmerge';
import { DashboardItem as DashboardItemType } from '@/lib/utils/dashboardpros';

interface DashboardItemProps {
  dashboard: DashboardItemType;
  type: 'mine' | 'invited';
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  color: string;
  className?: string;
}

const DashboardItem = ({ dashboard, color, className }: DashboardItemProps) => {
  const { id, title } = dashboard;

  return (
    <Link
      href={`/dashboard/${id}`}
      className={cn(
        'relative flex items-center justify-between px-6 h-20 bg-black-300 border border-black-300 rounded-[20px] hover:opacity-80 transition duration-150 cursor-pointer group',
        className,
      )}
    >
      {/* 타이틀 영역 */}
      <div className="flex items-center min-w-0 flex-1">
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <Icon name="HashIcon" className="mt-4 w-8 h-8" style={{ color }} />
        </div>
        <span className="text-white font-medium truncate text-base">{title}</span>
      </div>
      {/* 오른쪽 화살표 */}
      <div className="flex items-center justify-center w-9 h-9 rounded-md group-hover:bg-[#2E2E2E] transition shrink-0">
        <Icon name="ArrowRight" className="w-5 h-5 text-gray-400" />
      </div>
    </Link>
  );
};

export default DashboardItem;
