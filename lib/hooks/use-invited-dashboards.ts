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

        const response = await getInvitations(params);

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
        setError(null);
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
    const timer = setTimeout(() => {
      loadDashboards(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [reloadKey, searchKeyword, loadDashboards]);

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
