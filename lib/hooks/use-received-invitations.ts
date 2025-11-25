// lib/hooks/use-received-invitations.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInvitations,
  acceptInvitation,
  declineInvitation,
} from '@/lib/api/services/invitations.service';
import { GetInvitationsResponse } from './../api/validations/invitations';

// useQuery에 사용할 Query Key 정의
const INVITATIONS_QUERY_KEY = ['receivedInvitations'];
const DEFAULT_SIZE = 50;

type GetInvitationsResponseData = GetInvitationsResponse['invitations']; // (Invitation)[] 배열 타입
export type Invitation = GetInvitationsResponseData[number];

const fetchInvitations = async (): Promise<Invitation[]> => {
  // 💡 실제 API 호출: size 파라미터를 명시적으로 전달
  const response: GetInvitationsResponse = await getInvitations({ size: DEFAULT_SIZE });

  return response.invitations;
};

/**
 * 받은 초대 목록을 조회하고, 수락/거절 기능을 제공하는 Custom Hook
 */
export const useReceivedInvitations = () => {
  const queryClient = useQueryClient(); // 1. 💌 초대 목록 조회 (GET)

  const {
    data: invitations,
    isLoading,
    error,
  } = useQuery<Invitation[]>({
    queryKey: INVITATIONS_QUERY_KEY,
    queryFn: fetchInvitations, // 💡 파라미터를 전달하는 래퍼 함수 사용
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시된 데이터 사용 (선택 사항)
  }); // 2. ✅ 초대 수락 기능 (PUT)

  const acceptMutation = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: () => {
      alert('초대가 수락되었습니다.'); // 💡 성공 시 초대 목록을 즉시 다시 불러오기 (Refetch)
      queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY });
      // NOTE: 대시보드가 추가되었으므로, 내 대시보드 목록도 갱신해야 할 수 있습니다.
      // queryClient.invalidateQueries({ queryKey: ['myDashboards'] });
    },
    onError: (err) => {
      console.error('초대 수락 실패:', err);
      alert('초대 수락에 실패했습니다.');
    },
  }); // 3. ❌ 초대 거절 기능 (PUT)

  const declineMutation = useMutation({
    mutationFn: declineInvitation,
    onSuccess: () => {
      alert('초대가 거절되었습니다.'); // 💡 성공 시 초대 목록을 즉시 다시 불러오기 (Refetch)
      queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY });
    },
    onError: (err) => {
      console.error('초대 거절 실패:', err);
      alert('초대 거절에 실패했습니다.');
    },
  });

  return {
    invitations,
    isLoading,
    error,
    isMutating: acceptMutation.isPending || declineMutation.isPending,
    handleAccept: acceptMutation.mutate,
    handleDecline: declineMutation.mutate,
  };
};

// export default useReceivedInvitations;
