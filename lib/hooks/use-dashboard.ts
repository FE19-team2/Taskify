import { useState, useEffect } from 'react';
import { getDashboards } from '../api/services/dashboards.service';
import { getInvitations } from '../api/services/invitations.service';
import { GetDashboardsResponse } from '../api/validations/dashboards';
import { GetInvitationsResponse } from '../api/validations/invitations';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  isMine: boolean;
}

type DashboardType = 'mine' | 'invited';

async function fetchDashboards(type: DashboardType): Promise<Dashboard[]> {
  console.log(`Fetching dashboards of type: ${type}`);

  if (type === 'mine') {
    const params = { size: 1000 };
    const response: GetDashboardsResponse = await getDashboards(params);

    return response.dashboards.map((item) => ({
      id: item.id,
      title: item.title,
      color: item.color || '#000000',
      isMine: true,
    }));
  } else {
    const params = { size: 1000 };
    const response: GetInvitationsResponse = await getInvitations(params);

    return response.invitations.map((invitation) => ({
      id: invitation.dashboard.id,
      title: invitation.dashboard.title,
      color: '#999999',
      isMine: false,
    }));
  }
}

const useDashboards = (type: DashboardType) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadDashboards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchDashboards(type);
        setDashboards(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('알 수 없는 에러가 발생했습니다.'));
        }
        setDashboards([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (type) {
      loadDashboards();
    }
  }, [type]);

  return { dashboards, isLoading, error };
};

export default useDashboards;
