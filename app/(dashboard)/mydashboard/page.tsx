'use client';

import React, { useState } from 'react';
import {
  DashboardSection,
  InvitedDashboardSection,
} from './_components/dashboard/DashboardSection';
import { acceptInvitation, declineInvitation } from '@/lib/api/services/invitations.service';
import DashboardList from './_feat/DashboardList';
import useMyDashboards from '@/lib/hooks/use-mydashboards';
import useInvitedDashboards from '@/lib/hooks/use-invited-dashboards';
import SearchInput from '@/components/ui/input/SearchInput';
import Input from '@/components/ui/input/Input';
import EmptyState from './_components/dashboard/EmptyState';
import ErrorDisplay from './_components/dashboard/ErrorDisplay';
import { useDashboardContext } from '../layout';

const DashboardPage = () => {
  const { openCreateModal } = useDashboardContext();
  const {
    dashboards: myDashboards,
    isLoading: isMyLoading,
    error: myError,
    reloadDashboards: reloadMyDashboards,

    mainCurrentPage: myCurrentPage,
    mainTotalPages: myTotalPages,
    gotoMainPage: gotoMyPage,

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

  return (
    <>
      <main className="flex-1 min-h-screen pt-[66px] md:pt-16">
        <div className="pt-0 md:pt-6 px-4 md:px-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10">홈</h1>
        </div>

        {/*   내 대시보드 섭션 */}
        <DashboardSection title="내 대시보드">
          <div className="md:w-full mx-auto">
            {myError ? (
              <ErrorDisplay message={myError.message} />
            ) : !isMyLoading && myDashboards.length === 0 ? (
              <EmptyState type="mine" onCreateClick={openCreateModal} />
            ) : (
              <DashboardList
                type="mine"
                dashboards={dashboardsToShow}
                isLoading={isMyLoading}
                error={myError}
                currentPage={myCurrentPage}
                totalPages={myTotalPages}
                gotoPage={gotoMyPage}
                onCreateClick={openCreateModal}
              />
            )}
          </div>
        </DashboardSection>

        <InvitedDashboardSection title="초대받은 대시보드">
          {invitedDashboards.length > 0 && (
            <SearchInput>
              <Input
                variant="primary"
                size="lg"
                type="text"
                value={searchKeyword}
                onChange={(value) => setSearchKeyword(value)}
                placeholder="검색"
                className="w-full pl-10"
              />
            </SearchInput>
          )}

          <DashboardList
            type="invited"
            dashboards={invitedDashboards}
            isLoading={isInvitedLoading}
            error={invitedError}
            hasMore={hasMore}
            loadNextPage={loadNextPage}
            onAccept={handleAccept}
            onReject={handleReject}
            onCreateClick={openCreateModal}
          />
        </InvitedDashboardSection>
      </main>
    </>
  );
};

export default DashboardPage;
