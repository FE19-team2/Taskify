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

const DashboardItem = ({ dashboard, type, onAccept, onReject, className }: DashboardItemProps) => {
  const { id, title, isMine, color } = dashboard;

  const CrownIcon = isMine && (
    <div className="ml-2 flex items-center text-brand-400">
      <Icon name="CrownIcon" className="w-4 h-4" />
    </div>
  );
  const InvitationButtons = type === 'invited' && (
    <div className="flex space-x-2 shrink-0">
      <button
        onClick={(event) => {
          event.preventDefault();
          onAccept && onAccept(id);
        }}
        className="px-3 py-1 text-sm font-semibold text-green-400 border border-green-400 rounded-md hover:bg-green-900 transition"
      >
        수락
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          onReject && onReject(id);
        }}
        className="px-3 py-1 text-sm font-semibold text-red-400 border border-red-400 rounded-md hover:bg-red-900 transition"
      >
        거절
      </button>
    </div>
  );
  return (
    <Link
      href={`/dashboard/${id}`}
      className={cn(
        'flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 cursor-pointer',
      )}
    >
      <span className="text-white font-semibold truncate">{title}</span>

      {CrownIcon}
      {InvitationButtons}
    </Link>
  );
};

export default DashboardItem;
