import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInvitations,
  acceptInvitation,
  declineInvitation,
} from '@/lib/api/services/invitations.service';
import { GetInvitationsResponse } from './../api/validations/invitations';
import { DashboardItem } from '@/lib/utils/dashboard';

const INVITATIONS_QUERY_KEY = ['receivedInvitations'];
const DEFAULT_SIZE = 50;

type GetInvitationsResponseData = GetInvitationsResponse['invitations'];
export type InvitationApiData = GetInvitationsResponseData[number];

export interface InvitationListItem {
  invitationId: number;
  dashboardItem: DashboardItem;
}

const mapInvitationToListItem = (invitation: InvitationApiData): InvitationListItem => {
  return {
    invitationId: invitation.id,
    dashboardItem: {
      id: invitation.dashboard.id,
      title: invitation.dashboard.title,
      isMine: false,
      color: '#999999',
    },
  };
};

const fetchInvitations = async (): Promise<InvitationListItem[]> => {
  const response: GetInvitationsResponse = await getInvitations({ size: DEFAULT_SIZE });

  return response.invitations.map(mapInvitationToListItem);
};

export const useReceivedInvitations = () => {
  const queryClient = useQueryClient();

  const {
    data: invitations,
    isLoading,
    error,
  } = useQuery<InvitationListItem[]>({
    queryKey: INVITATIONS_QUERY_KEY,
    queryFn: fetchInvitations,
    staleTime: 5 * 60 * 1000,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: () => {
      alert('초대가 수락되었습니다.');
      queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY });
    },
    onError: (err) => {
      console.error('초대 수락 실패:', err);
      alert('초대 수락에 실패했습니다.');
    },
  });

  const declineMutation = useMutation({
    mutationFn: declineInvitation,
    onSuccess: () => {
      alert('초대가 거절되었습니다.');
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
