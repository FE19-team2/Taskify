'use client';

import React, { useState } from 'react';
import DashboardHeader from './_components/dashboard/DashboardHeader';
import {
  DashboardSection,
  InvitedDashboardSection,
} from './_components/dashboard/DashboardSection';
import Sidebar from './_components/layout/Sidebar';
import { acceptInvitation, declineInvitation } from '@/lib/api/services/invitations.service';
import DashboardList from './_feat/DashboardList';
import useMyDashboards from '@/lib/hooks/use-mydashboards';
import useInvitedDashboards from '@/lib/hooks/use-invited-dashboards';
import SearchInput from '@/components/ui/input/SearchInput';
import Input from '@/components/ui/input/Input';
import EmptyState from './_components/dashboard/EmptyState';
import useUser from '@/lib/hooks/use-user';
import ErrorDisplay from './_components/dashboard/ErrorDisplay';
const DashboardPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const isMobileorTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

  const {
    dashboards: myDashboards,
    isLoading: isMyLoading,
    error: myError,
    reloadDashboards: reloadMyDashboards,

    mainCurrentPage: myCurrentPage,
    mainTotalPages: myTotalPages,
    gotoMainPage: gotoMyPage,

    sidebarDashboards,
    sidebarCurrentPage,
    sidebarTotalPages,
    gotoSidebarPage,
    dataAll: allMyDashboards,
  } = useMyDashboards();

  const {
    dashboards: invitedDashboards,
    isLoading: isInvitedLoading,
    error: invitedError,
    hasMore,
    loadNextPage,
    searchKeyword,
    setSearchKeyword,
    reloadDashboards: reloadInvitedDashboards,
  } = useInvitedDashboards();

  React.useEffect(() => {
    console.log('Current allMyDashboards:', allMyDashboards);
    if (allMyDashboards && allMyDashboards.length === 0 && !isMyLoading) {
      console.log('대시보드데이터는 로드됨 allMydashboard가 비어있습니다 훅을 확인하세요.');
    }
  }, [allMyDashboards, isMyLoading]);
  const handleAccept = async (InvitationId: number) => {
    try {
      await acceptInvitation(InvitationId);
      alert('대시보드가 수락되었습니다.');
      reloadInvitedDashboards();
      reloadMyDashboards();
    } catch (error) {
      console.error('수락 실패:', error);
      alert('수락에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleReject = async (invitationId: number) => {
    try {
      await declineInvitation(invitationId);
      alert('대시보드 초대를 거절했습니다.');
      reloadInvitedDashboards();
    } catch (error) {
      console.error('거절 실패:', error);
      alert('거절에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const currentFashboards = React.useMemo(() => {
    if (isMobileorTablet) {
      return myDashboards.slice(0, 2);
    }
    return myDashboards;
  }, [isMobileorTablet, myDashboards]);

  const [isLgScreen, setIsLgScreen] = useState(false);
  React.useEffect(() => {
    const checkSSize = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };
    checkSSize();
    window.addEventListener('resize', checkSSize);
    return () => {
      window.removeEventListener('resize', checkSSize);
    };
  }, []);

  const dashboardsToShow = React.useMemo(() => {
    if (isLgScreen) {
      return myDashboards;
    }
    return myDashboards.slice(0, 2);
  }, [isLgScreen, myDashboards]);

  const hasInvitedDashboards = invitedDashboards.length > 0;
  const showInvitedEmptyState = !isInvitedLoading && !invitedError && !hasInvitedDashboards;

  const currentUserName = user ? user.nickname : 'Guest';

  return (
    <>
      <DashboardHeader onSidebarToggle={handleSidebarToggle} />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <main
        className={`flex-1 min-h-screen px-4 pt-[66px] ${isSidebarOpen ? 'pointer-events-none' : ''} md:ml-64 md:px-10 md:pt-16`}
      >
        <div className="pt-0 md:pt-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10">홈</h1>
        </div>

        {/*   내 대시보드 섹션 */}
        <DashboardSection title="내 대시보드">
          <div className="md:w-full mx-auto">
            {myError ? (
              <ErrorDisplay message={myError.message} />
            ) : (
              <DashboardList
                type="mine"
                dashboards={dashboardsToShow}
                isLoading={isMyLoading}
                error={myError}
                currentPage={myCurrentPage}
                totalPages={myTotalPages}
                gotoPage={gotoMyPage}
                onCreateClick={() => setIsCreateModalOpen(true)}
              />
            )}
          </div>
        </DashboardSection>

        <InvitedDashboardSection title="초대받은 대시보드">
          <div className="w-full mb-4 md:w-full lg:w-auto lg:max-w-xs ">
            <SearchInput>
              <Input
                variant="primary"
                size="lg"
                type="text"
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="검색"
                className="w-full pl-10"
              />
            </SearchInput>
          </div>

          <div className="w-full  md:w-full md:h-auto mx-auto mt-4 px-5 md:px-0">
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
      </main>
    </>
  );
};

export default DashboardPage;
