import { useReceivedInvitations } from '@/lib/hooks/use-received-invitations';
import DashboardItem from '@/app/mydashboard/_feat/DashboardItem';

const InvitationsList = () => {
  const { invitations, isLoading, error, handleAccept, handleDecline } = useReceivedInvitations();

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
      <h2 className="text-xl font-bold text-white mb-4">받은 초대 목록</h2>
      {invitations.map((item) => (
        <DashboardItem
          key={item.dashboardItem.id}
          dashboard={item.dashboardItem}
          color={'var(--color-gray-500'}
          type="invited"
          onAccept={() => handleAccept(item.invitationId)}
          onReject={() => handleDecline(item.invitationId)}
        />
      ))}
    </div>
  );
};

export default InvitationsList;
