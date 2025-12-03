import React, { useCallback, useState } from 'react';
import DashboardTable from '@/app/(dashboard)/mydashboard/_feat/InvitedDashboardTable';
import useInvitedDashboards from '@/lib/hooks/use-invited-dashboards';

import { acceptInvitation, declineInvitation } from '@/lib/api/services/invitations.service';

const InvitationsList = () => {
  const [isResponding, setIsResponding] = useState(false);

  const {
    dashboards,
    isLoading,
    error,
    loadNextPage,
    hasMore,
    searchKeyword,
    setSearchKeyword,
    reloadDashboards,
  } = useInvitedDashboards();

  // 수락/거절 처리
  const handleRespond = useCallback(
    async (invitationId: number, accepted: boolean) => {
      if (isResponding) return;

      setIsResponding(true);
      try {
        if (accepted) await acceptInvitation(invitationId);
        else await declineInvitation(invitationId);

        await reloadDashboards();
      } catch (err) {
        console.error(err);
      } finally {
        setIsResponding(false);
      }
    },
    [isResponding, reloadDashboards],
  );

  const handleAccept = (id: number) => handleRespond(id, true);
  const handleReject = (id: number) => handleRespond(id, false);

  if (error) return <div className="text-red-500">초대 목록 불러오기 실패</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">받은 초대 목록</h2>

      {/* 검색 */}
      <input
        type="text"
        placeholder="제목으로 검색"
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
        className="w-full p-2 mb-4 text-black border border-gray-300 rounded-md"
      />

      {/* DashboardTable 적용 */}
      <DashboardTable
        data={dashboards}
        type="invited"
        onAccept={handleAccept}
        onReject={handleReject}
        isLoading={isLoading}
      />

      {/* 더 불러오기 */}
      <div className="text-center mt-4">
        {hasMore && !isLoading && (
          <button
            onClick={loadNextPage}
            disabled={isResponding}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            더 불러오기
          </button>
        )}
      </div>
    </div>
  );
};

export default InvitationsList;
