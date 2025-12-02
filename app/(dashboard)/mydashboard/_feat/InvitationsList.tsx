import DashboardItem from '@/app/(dashboard)/mydashboard/_feat/DashboardItem';
import { useReceivedInvitationsMock } from '@/lib/mocks/invitations-api-mock';
const InvitationsList = () => {
  const {
    invitations,
    isLoading,
    error,
    handleAccept,
    handleDecline,
    searchTerm,
    setSearchTerm,
    loadMore,
    hasMore,
  } = useReceivedInvitationsMock();

  if (isLoading) {
    return <div>초대 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div>초대 목록을 불러오지 못했습니다.</div>;
  }

  const hasInvitations = Array.isArray(invitations) && invitations.length > 0;

  if (!hasInvitations) {
    return <div>받은 초대장이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">받은 초대 목록 (Mock 테스트 중)</h2>

      <input
        type="text"
        placeholder="제목으로 검색"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-full p-2 mb-4 text-black border border-gray-300 rounded-md"
      />

      {!hasInvitations && (
        <div className="text-center text-gray-500 py-10">아직 초대받은 대시보드가 없어요</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {invitations.map((item) => (
          <DashboardItem
            key={item.dashboardItem.id}
            dashboard={item.dashboardItem}
            type="invited"
            color="#999999"
            onAccept={() => handleAccept(item.invitationId)}
            onReject={() => handleDecline(item.invitationId)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => loadMore()}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? '로딩 중...' : '더 불러오기 (무한 스크롤 테스트)'}
          </button>
        </div>
      )}
    </div>
  );
};

export default InvitationsList;
