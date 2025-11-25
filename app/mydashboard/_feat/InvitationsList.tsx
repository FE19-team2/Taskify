// app/mydashboard/_components/InvitationsList.tsx (예시)

import { useReceivedInvitations } from '@/lib/hooks/use-received-invitations';
import DashboardItem from '@/app/mydashboard/_feat/DashboardItem';

const InvitationsList = () => {
  const { invitations, isLoading, error, handleAccept, handleDecline } = useReceivedInvitations();

  if (isLoading) {
    return <div>초대 목록을 불러오는 중...</div>; // 로딩 UI
  }

  if (error) {
    return <div>초대 목록을 불러오지 못했습니다.</div>; // 에러 UI
  }

  const hasInvitations = Array.isArray(invitations) && invitations.length > 0;

  if (!hasInvitations) {
    return <div>받은 초대장이 없습니다.</div>; // 빈 상태 UI
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">받은 초대 목록</h2>
      {invitations.map((invitation) => (
        <DashboardItem
          key={invitation.id} // 💡 수정 1: dashboard 객체에서 color를 제거하고,
          dashboard={
            {
              id: invitation.dashboard.id,
              title: invitation.dashboard.title,
              isMine: false,
            } // as DashboardItem 제거
          } // 💡 수정 2: color를 최상위 Prop으로 전달
          color={'#999999'}
          type="invited"
          onAccept={() => handleAccept(invitation.id)}
          onReject={() => handleDecline(invitation.id)}
        />
      ))}
    </div>
  );
};

export default InvitationsList;
