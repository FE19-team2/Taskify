'use client';

import React, { useState } from 'react';
import DashboardHeader from './_components/dashboard/DashboardHeader';
import DashboardSection from './_components/dashboard/DashboardSection';
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

  const {
    dashboards: myDashboards,
    isLoading: isMyLoading,
    error: myError,
    hasMore: myHasMore,
    loadNextPage: myLoadNextPage,
    reloadDashboards: reloadMyDashboards,
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

  const hasInvitedDashboards = invitedDashboards.length > 0;
  const showInvitedEmptyState = !isInvitedLoading && !invitedError && !hasInvitedDashboards;

  const currentUserName = user ? user.nickname : 'Guest';

  return (
    <>
      <Sidebar
        userName={currentUserName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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

        {/* 📌 1. 내 대시보드 섹션 */}
        <DashboardSection title="내 대시보드">
          <div className="w-[332px] h-[184px] md:w-full md:h-auto mx-auto">
            {myError ? (
              <ErrorDisplay message={myError.message} />
            ) : (
              <DashboardList
                type="mine"
                dashboards={myDashboards}
                isLoading={isMyLoading}
                error={myError}
                hasMore={myHasMore}
                loadNextPage={myLoadNextPage}
                onCreateClick={() => setIsCreateModalOpen(true)}
              />
            )}
          </div>
        </DashboardSection>

        <DashboardSection title="초대받은 대시보드">
          <SearchInput>
            <Input
              variant="primary"
              size="lg"
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="대시보드 이름으로 검색"
              className="w-full pl-10"
            />
          </SearchInput>

          <div className="w-[332px] h-[184px] md:w-full md:h-auto mx-auto mt-4">
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
        </DashboardSection>
      </main>
    </>
  );
};

export default DashboardPage;
