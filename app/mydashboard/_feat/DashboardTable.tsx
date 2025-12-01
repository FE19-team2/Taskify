import React from 'react';
import DashboardItemComponent from './DashboardItem';
import { DashboardItem } from '@/lib/utils/dashboardpros';
import Button from '@/components/ui/button/Button';
import { UserAvatar } from '@/components/ui/dropdown/UserAvatar';

interface DashboardTableProps {
  data: DashboardItem[];
  type: 'mine' | 'invited';
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  currentPage?: number;
  totalPages?: number;
  gotoPage?: (page: number) => void;
  isLoading?: boolean;
  inviter?: string;
}

const DashboardTable = ({
  data,
  type,
  onAccept,
  onReject,
  currentPage,
  totalPages,
  gotoPage,
  isLoading,
  inviter,
}: DashboardTableProps) => {
  if (type === 'invited') {
    return (
      <div className="w-full bg-transparent rounded-xl overflow-hidden">
        <div className="hidden md:flex justify-between items-center p-4 border-b border-gray-700 text-gray-400 font-semibold text-sm">
          <span className="w-1/3 pl-2">이름</span>
          <span className="w-1/3 text-center">초대자</span>
          <span className="w-1/3 text-right pr-18">수락 여부</span>
        </div>

        {data.map((dashboard) => (
          <div
            key={dashboard.id}
            className="flex flex-col w-full md:flex-row justify-between items-start md:items-center py-3 px-4 border-b border-gray-800 hover:bg-gray-800 transition text-white"
          >
            <span className="w-full truncate text-base pl-2 mb-2 md:mb-0 md:w-1/3">
              {dashboard.title}
            </span>

            <div className="w-full flex justify-between items-center md:w-2/3">
              <div className="flex items-center gap-2 text-gray-300 md:w-1/2 md:justify-center">
                <UserAvatar name={inviter} className="w-5 h-5 text-xs" />
                <span className="text-sm md:text-base">{inviter}</span>
              </div>

              <div className="flex justify-end gap-2 md:w-1/2 pr-2">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => onReject && onReject(dashboard.id)}
                  className="text-xs px-2 py-1 rounded-2xl"
                >
                  거절
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  onClick={() => onAccept && onAccept(dashboard.id)}
                  className="text-xs px-2 py-1 rounded-2xl text-white bg-green-600 hover:bg-green-700 transition"
                >
                  수락
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {data.map((dashboard, index) => (
          <DashboardItemComponent
            key={dashboard.id}
            dashboard={dashboard}
            color={dashboard.color}
            type={type}
            onAccept={onAccept}
            onReject={onReject}
            className={index % 2 === 0 ? 'hidden lg:block' : ''}
          />
        ))}
      </div>
      {type === 'mine' && totalPages && totalPages > 1 && currentPage && gotoPage && (
        <div className="flex justify-end items-center mt-6">
          <span className="text-white text-lg mr-4">
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => gotoPage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="p-2 mx-1 text-gray-500 hover:text-white disabled:opacity-50 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <button
            onClick={() => gotoPage(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 mx-1 text-gray-500 hover:text-white disabled:opacity-50 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
