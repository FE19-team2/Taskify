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

// 💡 1. ErrorDisplay 컴포넌트 정의 (에러 발생 시 UI)
// 모바일 W: 332px, H: 184px, 데스크톱 W: full, H: auto를 따릅니다.
const ErrorDisplay = ({ type, message }: { type: string; message?: string }) => (
  <div className="w-full h-[184px] md:h-auto flex items-center justify-center bg-gray-700 rounded-lg">
    <div className="text-center text-red-500 p-4">
      <div className="mb-1 text-base">⚠️ 에러 발생</div>
      <div className="text-sm">Internal Server Error</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar 오버레이 상태
  const { user } = useUser(); // 유저 닉네임 가져오기

  // 1. 내가 만든 대시보드 데이터 및 페이지네이션 상태
  const {
    dashboards: myDashboards,
    isLoading: isMyLoading,
    error: myError,
    hasMore: myHasMore,
    loadNextPage: myLoadNextPage,
    reloadDashboards: reloadMyDashboards,
  } = useMyDashboards();

  // 2. 초대받은 대시보드 데이터 및 무한 스크롤/검색 상태
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

  // 🤝 수락 핸들러
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

  // 🗑️ 거절 핸들러
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

  // 💡 Sidebar 토글 핸들러
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 💡 초대받은 대시보드 목록이 비어 있는지 확인 (로딩 중이 아니고 에러도 없을 때)
  const hasInvitedDashboards = invitedDashboards.length > 0;
  const showInvitedEmptyState = !isInvitedLoading && !invitedError && !hasInvitedDashboards;

  // 💡 유저 닉네임 (SidebarFooter 용)
  const currentUserName = user ? user.nickname : 'Guest';

  return (
    <>
      {/* 1. Sidebar 컴포넌트 (오버레이 로직 포함) */}
      <Sidebar
        userName={currentUserName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. DashboardHeader (모바일에서 Sidebar 토글 버튼 표시) */}
      <DashboardHeader onSidebarToggle={handleSidebarToggle} />

      {/* 3. Dimmed Overlay (모바일에서 Sidebar 열렸을 때 뒷 배경 처리) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* 4. Main Content Area */}
      {/* 💡 md 미만에서 ml-0, md 이상에서 ml-64 (Sidebar 너비만큼 마진) */}
      <main
        className={`flex-1 min-h-screen px-4 pt-[66px] ${isSidebarOpen ? 'pointer-events-none' : ''} md:ml-64 md:px-10 md:pt-16`}
      >
        <div className="pt-0 md:pt-6">
          {/* 💡 홈 제목 크기 반응형 적용 */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10">홈</h1>
        </div>

        {/* 📌 1. 내 대시보드 섹션 */}
        <DashboardSection title="내 대시보드">
          {/* 💡 콘텐츠 박스 반응형 높이/너비 적용 (w-[332px] h-[184px] on mobile) */}
          <div className="w-[332px] h-[184px] md:w-full md:h-auto mx-auto">
            {myError ? (
              <ErrorDisplay type="내 대시보드" message={myError.message} />
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

        {/* 📌 2. 초대받은 대시보드 섹션 */}
        <DashboardSection title="초대받은 대시보드">
          {/* 💡 검색 입력 필드 */}
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

          {/* 💡 콘텐츠 박스 반응형 높이/너비 적용 (w-[332px] h-[184px] on mobile) */}
          <div className="w-[332px] h-[184px] md:w-full md:h-auto mx-auto mt-4">
            {invitedError ? (
              <ErrorDisplay type="초대 대시보드" message={invitedError.message} />
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
