'use client';

import { useState, useCallback, useEffect } from 'react';
import { DashboardItem } from '../utils/dashboardpros';
import { getInvitations } from '../api/services/invitations.service';

const PAGE_SIZE = 10;

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  const loadDashboards = useCallback(
    async (append: boolean) => {
      if (!hasMore && append) return;
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const params: { size: number; cursorId?: number; title?: string } = {
          size: PAGE_SIZE,
        };

        if (append && cursorId !== null) {
          params.cursorId = cursorId;
        }

        if (searchKeyword && searchKeyword.trim()) {
          params.title = searchKeyword;
        }

        console.log('🔍 초대받은 대시보드 요청 시작:', params);
        const response = await getInvitations(params);
        console.log('✅ 초대받은 대시보드 응답:', response);

        const newDashboardItems: DashboardItem[] = response.invitations.map((inv) => ({
          id: inv.dashboard.id,
          title: inv.dashboard.title,
          color: '#30A9DE',
          isMine: false,
          inviter: inv.inviter.nickname,
          invitationId: inv.id,
        }));

        setDashboards((prev) => (append ? [...prev, ...newDashboardItems] : newDashboardItems));
        setCursorId(response.cursorId);
        setHasMore(response.cursorId !== null);
      } catch (err) {
        console.error('초대받은 대시보드 로드 중 오류:', err);
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다'));
        setHasMore(false);
        if (!append) {
          setDashboards([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [hasMore, isLoading, cursorId, searchKeyword],
  );

  useEffect(() => {
    setCursorId(null);
    setHasMore(true);
    setDashboards([]);
    setIsLoading(true);
    setError(null);

    const loadInitialData = async () => {
      try {
        const params: { size: number; title?: string } = {
          size: PAGE_SIZE,
        };

        if (searchKeyword && searchKeyword.trim()) {
          params.title = searchKeyword;
        }

        console.log('🔍 초대받은 대시보드 초기 요청:', params);
        const response = await getInvitations(params);
        console.log('✅ 초대받은 대시보드 초기 응답:', response);

        const newDashboardItems: DashboardItem[] = response.invitations.map((inv) => ({
          id: inv.dashboard.id,
          title: inv.dashboard.title,
          color: '#30A9DE',
          isMine: false,
          inviter: inv.inviter.nickname,
          invitationId: inv.id,
        }));

        setDashboards(newDashboardItems);
        setCursorId(response.cursorId);
        setHasMore(response.cursorId !== null);
      } catch (err) {
        console.error('초대받은 대시보드 로드 중 오류:', err);
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다'));
        setHasMore(false);
        setDashboards([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [reloadKey, searchKeyword]);

  const loadNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;
    loadDashboards(true);
  }, [isLoading, hasMore, loadDashboards]);

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
