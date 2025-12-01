'use client';

import { useState, useEffect, useCallback } from 'react';
import { getInvitations } from '@/lib/api/services/invitations.service';
import { DashboardItem, DashboardHookReturn } from '@/lib/utils/dashboard';

interface InvitationItem {
  id: number;
  dashboard: DashboardItem;
}

const ITEMS_PER_PAGE = 10;

const useInvitedDashboards = () => {
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadDashboards = useCallback(
    async (append = true, resetCursor = false) => {
      if (!hasMore && append) return;
      if (isLoading) return;

      const targetCursorId = resetCursor ? undefined : cursorId;
      const targetPageSize = ITEMS_PER_PAGE;

      if (!append) setIsLoading(true);
      setError(null);

      try {
        const response = await getInvitations({
          cursorId: targetCursorId,
          size: targetPageSize,
          title: searchKeyword || undefined,
        });

        const newDashboardItems = response.invitations.map((invitation) => ({
          id: invitation.dashboard.id,
          title: invitation.dashboard.title,
          isMine: false,
          color: '#999999',
        }));

        setDashboards((prev) => (append ? [...prev, ...newDashboardItems] : newDashboardItems));

        if (response.cursorId) {
          setCursorId(response.cursorId);
          setHasMore(true);
        } else {
          setCursorId(undefined);
          setHasMore(false);
        }
      } catch (err) {
        console.error('Failed to fetch invited dashboards:', err);
        setError(err instanceof Error ? err : new Error('데이터 로딩 실패'));
      } finally {
        setIsLoading(false);
      }
    },
    [cursorId, hasMore, searchKeyword, isLoading],
  );

  useEffect(() => {
    setCursorId(undefined);
    setHasMore(true);
    setDashboards([]);

    const timeoutId = setTimeout(() => {
      loadDashboards(false, true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  const loadNextPage = () => {
    if (isLoading || !hasMore) return;
    loadDashboards(true, false);
  };

  const reloadDashboards = useCallback(() => {
    setCursorId(undefined);
    setHasMore(true);
    setDashboards([]);
    loadDashboards(false, true);
  }, [loadDashboards]);

  return {
    dashboards,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    searchKeyword,
    setSearchKeyword,
    reloadDashboards,
  };
};

export default useInvitedDashboards;
