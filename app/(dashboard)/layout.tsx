'use client';

import { useState } from 'react';
import DashboardHeader from './mydashboard/_components/dashboard/DashboardHeader';
import {
  DashboardSection,
  InvitedDashboardSection,
} from './mydashboard/_components/dashboard/DashboardSection';
import DashboardList from './mydashboard/_feat/DashboardList';
import SearchInput from '@/components/ui/input/SearchInput';
import Input from '@/components/ui/input/Input';
import ErrorDisplay from './mydashboard/_components/dashboard/ErrorDisplay';
import EmptyState from './mydashboard/_components/dashboard/EmptyState';
import Sidebar from './mydashboard/_components/layout/Sidebar';
import useMyDashboards from '@/lib/hooks/use-mydashboards';
import useInvitedDashboards from '@/lib/hooks/use-invited-dashboards';
import { acceptInvitation, declineInvitation } from '@/lib/api/services/invitations.service';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  // -----------------------------
  // 1️⃣ 내 대시보드
  // -----------------------------
  const {
    dashboards: myDashboards,
    isLoading: isMyLoading,
    error: myError,
    currentPage: myCurrentPage,
    totalPages: myTotalPages,
    loadPage: loadMyPage,
  } = useMyDashboards();

  // -----------------------------
  // 2️⃣ 초대받은 대시보드
  // -----------------------------
  const {
    dashboards: invitedDashboards,
    isLoading: isInvitedLoading,
    error: invitedError,
    hasMore,
    loadNextPage,
    reloadDashboards,
    searchKeyword,
    setSearchKeyword,
  } = useInvitedDashboards();

  const handleAccept = async (id: number) => {
    try {
      await acceptInvitation(id);
      reloadDashboards();
    } catch (err) {
      console.error('초대 수락 실패:', err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await declineInvitation(id);
      reloadDashboards();
    } catch (err) {
      console.error('초대 거절 실패:', err);
    }
  };

  const showInvitedEmptyState =
    !isInvitedLoading && invitedDashboards.length === 0 && !invitedError;

  // -----------------------------
  // 3️⃣ Sidebar 상태
  // -----------------------------
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleSidebarToggle = () => setIsSidebarOpen((prev) => !prev);

  // -----------------------------
  // 4️⃣ 새 대시보드 생성 모달
  // -----------------------------
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const pathname = usePathname();
  const isDashboardRoot = pathname === '/mydashboard';

  // -----------------------------
  // 5️⃣ 렌더링
  // -----------------------------
  return (
    <>
      <aside className="w-full text-gray-100 bg-black-500 flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          userName="사용자 이름"
          myDashboards={myDashboards}
          currentPage={myCurrentPage}
          totalPages={myTotalPages}
          gotoPage={loadMyPage} // 페이지 이동 함수
        />

        <div
          className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out relative z-40 ml-0 md:ml-64 `}
        >
          <DashboardHeader onSidebarToggle={handleSidebarToggle} />
          {isDashboardRoot && (
            <>
              <div className="mt-[60px] ml-6 md:pt-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10">홈</h1>
              </div>
              {/* 내 대시보드 */}
              <DashboardSection title="내 대시보드">
                <div className="md:w-full mx-auto">
                  {myError ? (
                    <ErrorDisplay message={myError.message} />
                  ) : (
                    <DashboardList
                      type="mine"
                      dashboards={myDashboards}
                      isLoading={isMyLoading}
                      error={myError}
                      currentPage={myCurrentPage}
                      totalPages={myTotalPages}
                      gotoPage={loadMyPage}
                      onCreateClick={() => setIsCreateModalOpen(true)}
                    />
                  )}
                </div>
              </DashboardSection>

              {/* 초대받은 대시보드 */}
              <InvitedDashboardSection title="초대받은 대시보드">
                <div className="w-full mb-4 md:w-full lg:w-auto lg:max-w-xs">
                  <SearchInput className="w-full lg:w-full mt-2">
                    <Input
                      variant="primary"
                      type="text"
                      size="lg"
                      value={searchKeyword}
                      onChange={(value: string) => setSearchKeyword(value)}
                      placeholder="검색"
                      className="w-full"
                    />
                  </SearchInput>
                </div>

                <div className="w-full md:w-full md:h-auto mx-auto mt-4 px-5 md:px-0">
                  {invitedError ? (
                    <ErrorDisplay message={invitedError.message} />
                  ) : showInvitedEmptyState ? (
                    <EmptyState type="invited" onCreateClick={() => setIsCreateModalOpen(true)} />
                  ) : (
                    <DashboardList
                      type="invited"
                      dashboards={invitedDashboards}
                      isLoading={isInvitedLoading}
                      error={invitedError}
                      hasMore={hasMore}
                      loadNextPage={loadNextPage}
                      onAccept={handleAccept}
                      onReject={handleReject}
                      onCreateClick={() => setIsCreateModalOpen(true)}
                    />
                  )}
                </div>
              </InvitedDashboardSection>
            </>
          )}
          : (<main className="mt-[60px] p-6 md:p-10">{children}</main>){'}'}
        </div>
      </aside>
    </>
  );
};

export default DashboardLayout;
