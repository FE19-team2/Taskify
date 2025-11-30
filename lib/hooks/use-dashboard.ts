// hooks/useDashboards.ts

import { useState, useEffect } from 'react';
import { getDashboards } from '../api/services/dashboards.service';
import { getInvitations } from '../api/services/invitations.service';
import { GetDashboardsResponse } from '../api/validations/dashboards';
import { GetInvitationsResponse } from '../api/validations/invitations';
// ----------------------------------------------------
// 1. 데이터 타입 정의 및 API 함수 Mock (가정)
// ----------------------------------------------------

// 대시보드 데이터의 타입을 명시적으로 정의합니다.
// 실제 프로젝트의 데이터 구조에 맞게 수정하세요.
interface Dashboard {
  id: number;
  title: string;
  color: string;
  isMine: boolean;
}

// 'type' 매개변수에 들어올 수 있는 값을 정의합니다.
type DashboardType = 'mine' | 'invited';

// API 호출 함수를 Mockup합니다. (실제 로직으로 대체해야 합니다)
async function fetchDashboards(type: DashboardType): Promise<Dashboard[]> {
  console.log(`Fetching dashboards of type: ${type}`);
  // TODO: 여기에 실제 API 호출 로직 (e.g., axios.get('/api/dashboards', { params: { type } }))을 넣으세요.

  if (type === 'mine') {
    // 💡 (1) 내 대시보드 목록 호출
    const params = { size: 1000 };
    const response: GetDashboardsResponse = await getDashboards(params);

    return response.dashboards.map((item) => ({
      id: item.id,
      title: item.title,
      color: item.color || '#000000', // 색상 필드가 없으면 기본값 설정
      isMine: true,
    }));
  } else {
    // 💡 (2) 초대받은 대시보드 목록 호출
    // NOTE: getInvitations API는 커서/검색을 사용하지만, 여기서는 전체 목록을 가정하고 size=1000으로 설정했습니다.
    const params = { size: 1000 };
    const response: GetInvitationsResponse = await getInvitations(params); // API 응답의 'invitations' 배열을 Dashboard 타입으로 변환

    return response.invitations.map((invitation) => ({
      id: invitation.dashboard.id,
      title: invitation.dashboard.title,
      color: '#999999', // 색상 필드가 없으면 기본값 설정
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
          // Error 객체가 아닌 경우를 대비하여 새로운 Error 객체를 생성합니다.
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
