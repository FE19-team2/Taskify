// use-invited-dashboards.ts

'use client';

import { useState, useCallback, useEffect } from 'react';
import { DashboardItem } from '../utils/dashboardpros';
// ⚠️ 실제 API 서비스 경로와 함수를 import 하세요.
import { getInvitations } from '../api/services/invitations.service';

// API 관련 상수 및 타입 정의
const DEFAULT_PAGE_SIZE = 10;

// API 응답에서 Inviter/Invitee 객체 구조
interface InviterOrInvitee {
  nickname: string;
  email: string;
  id: number;
}

// API 응답에서 Dashboard 객체 구조
interface InvitationDashboard {
  title: string;
  id: number;
}

// API 응답에서 Invitation 객체 구조
interface Invitation {
  id: number; // 초대 고유 ID
  inviter: InviterOrInvitee;
  teamId: string;
  dashboard: InvitationDashboard;
  invitee: InviterOrInvitee;
  inviteAccepted: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// 실제 API 응답 구조 (totalCount는 없음)
interface InvitedDashboardApiResponse {
  cursorId: number | null;
  invitations: Invitation[];
}

// UI에서 사용할 DashboardItem으로 매핑 (Invitation 객체로부터 추출)
const mapToDashboardItem = (raw: Invitation): DashboardItem => ({
  id: raw.dashboard.id, // 대시보드 ID
  invitationId: raw.id, // ⚠️ 수락/거절을 위해 초대 고유 ID 저장 (DashboardItem 타입에 필드 추가 필요)
  title: raw.dashboard.title,
  color: '#30A9DE', // 초대 목록에는 색상 정보가 없으므로 임시 값 사용
  isMine: false,
  inviter: raw.inviter.nickname, // 초대한 사람 닉네임
});

interface InfiniteScrollHookReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadNextPage: () => void;
  reloadDashboards: () => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

const useInvitedDashboards = (): InfiniteScrollHookReturn => {
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); // number | undefined를 사용하여 커서 상태 관리 (undefined는 첫 페이지 또는 끝을 의미)
  const [nextCursorId, setNextCursorId] = useState<number | undefined>(undefined);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [reloadKey, setReloadKey] = useState(0); // 더 불러올 데이터가 있는지 확인

  const hasMore = nextCursorId !== undefined;

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  const loadDashboards = useCallback(
    // 훅 내부에서는 number | undefined를 사용합니다.
    async (cursorToLoad: number | undefined, isReload: boolean) => {
      if (isLoading) return;

      if (cursorToLoad === undefined && !isReload && dashboards.length > 0) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // ⬇️ API는 number | null을 기대하므로 undefined를 null로 변환합니다. ⬇️

        // ⚠️ getInvitations 함수가 number | undefined만 받는다고 가정하고 타입 에러를 무시하기 위해 as any를 사용합니다.
        const response: InvitedDashboardApiResponse = await getInvitations({
          cursorId: cursorToLoad, // number | null 타입
          size: DEFAULT_PAGE_SIZE,
          title: searchKeyword, // 검색 필터 파라미터 이름 'title' 사용
        }); // 👈 에러가 지속될 경우를 대비한 Type Assertion

        const newDashboardItems: DashboardItem[] = response.invitations.map(mapToDashboardItem); // 재로드 또는 첫 페이지 로드 시 목록 교체, 아니면 추가

        setDashboards((prev) =>
          isReload || cursorToLoad === undefined
            ? newDashboardItems
            : [...prev, ...newDashboardItems],
        );

        // 서버에서 number | null을 받으므로, null이면 undefined로 변환하여 상태에 저장
        setNextCursorId(response.cursorId === null ? undefined : response.cursorId);
      } catch (err) {
        console.error('Failed to load invited dashboards:', err);
        setError(err instanceof Error ? err : new Error('초대 대시보드 로딩 오류가 발생했습니다.'));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, searchKeyword],
  ); // 1. 초기 로드, 검색, 강제 새로고침 시 데이터 초기화 및 로드

  useEffect(() => {
    // 1. 상태 초기화
    setDashboards([]);
    setNextCursorId(undefined);

    // 2. 새롭게 데이터 로드 (커서 undefined로 첫 페이지 요청)
    loadDashboards(undefined, true);
  }, [reloadKey, searchKeyword]);

  const loadNextPage = useCallback(() => {
    // nextCursorId가 undefined가 아닐 때만 다음 페이지 로드 요청
    if (nextCursorId !== undefined && !isLoading) {
      loadDashboards(nextCursorId, false);
    }
  }, [nextCursorId, isLoading, loadDashboards]);

  return {
    dashboards,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    reloadDashboards,
    searchKeyword,
    setSearchKeyword,
  };
};

export default useInvitedDashboards;
