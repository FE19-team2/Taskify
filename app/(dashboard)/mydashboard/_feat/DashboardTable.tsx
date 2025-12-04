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
  onCreateDashboard?: () => void;
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
  onCreateDashboard,
}: DashboardTableProps) => {
  if (type === 'invited') {
    return (
      <div className="w-full bg-transparent rounded-xl overflow-hidden">
        <div className="hidden md:flex justify-between items-center p-4 border-b border-gray-700 text-gray-400 font-semibold text-sm">
          <span className="w-1/3 pl-2">이름</span>
          <span className="w-1/3 text-center">초대자</span>
          <span className="w-1/3 text-right pr-[72px]">수락 여부</span>
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
                <UserAvatar name={dashboard.inviter} className="w-5 h-5 text-xs" />
                <span className="text-sm md:text-base">{dashboard.inviter}</span>
              </div>

              <div className="flex justify-end gap-2 md:w-1/2 pr-2">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() =>
                    onReject && dashboard.invitationId && onReject(dashboard.invitationId)
                  }
                  className="text-xs px-2 py-1 rounded-2xl"
                >
                  거절
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  onClick={() =>
                    onAccept && dashboard.invitationId && onAccept(dashboard.invitationId)
                  }
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
  // 화면 크기별 대시보드 개수 제한
  const getDisplayedDashboards = () => {
    // PC: 3개, 태블릿: 1개, 모바일: 1개
    // 미디어 쿼리는 CSS에서 처리하므로 모든 데이터를 전달하고 CSS로 제어
    return data;
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 overflow-x-auto">
        <button
          onClick={onCreateDashboard}
          className="flex items-center justify-center w-full md:w-[222px] lg:w-[355px] h-20 border-2 border-dashed rounded-[20px] hover:border-violet-500 hover:bg-[#1F1F1F] transition group border-black-300 shrink-0"
        >
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-violet-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-gray-400 group-hover:text-violet-500 font-medium">
            새로운 대시보드
          </span>
        </button>
        {getDisplayedDashboards().map((dashboard, index) => (
          <DashboardItemComponent
            key={dashboard.id}
            dashboard={dashboard}
            color={dashboard.color}
            type={type}
            onAccept={onAccept}
            onReject={onReject}
            className={`w-full md:w-[222px] lg:w-[355px] shrink-0 ${
              index >= 1 ? 'hidden md:flex' : ''
            } ${index >= 2 ? 'hidden lg:flex' : ''}`}
          />
        ))}
      </div>
      {type === 'mine' && totalPages && totalPages > 1 && currentPage && gotoPage && (
        <div className="flex justify-end items-center mt-6 gap-4">
          <span className="text-white text-base">
            {currentPage} of {totalPages}
          </span>

          <div className="flex gap-3">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              style={{ borderColor: '#262629' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                />
              </svg>
            </button>

            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              style={{ borderColor: '#262629' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
