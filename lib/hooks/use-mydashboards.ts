'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardItem, DashboardHookReturn } from '../utils/dashboard';
import { getDashboards } from '../api/services/dashboards.service';
import { GetDashboardsResponse } from '../api/validations/dashboards';

interface CursorDashboardHookReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadNextPage: () => void;
  reloadDashboards: () => void;
}
const ITEMS_PER_PAGE = 10;

const useMyDashboards = (): CursorDashboardHookReturn => {
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
    setCursorId(undefined);
  }, []);

  const loadDashboards = useCallback(
    async (append: boolean) => {
      if (!hasMore && append) return;
      if (isLoading) return;

      if (!append) setIsLoading(true);
      setError(null);

      try {
        const response: GetDashboardsResponse = await getDashboards({
          cursorId: cursorId,
          size: ITEMS_PER_PAGE,
        });

        const newDashboardItems: DashboardItem[] = response.dashboards.map((item) => ({
          id: item.id,
          title: item.title,
          color: item.color || '#000000',
          isMine: true,
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
        console.error('Failed to fetch my dashboards:', err);
        setError(err instanceof Error ? err : new Error('데이터 로딩 실패'));
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [cursorId, hasMore, isLoading],
  );

  useEffect(() => {
    setCursorId(undefined);
    setHasMore(true);
    setDashboards([]);

    if (reloadKey >= 0) {
      setIsLoading(true);
      loadDashboards(false);
    }
  }, [reloadKey]);

  const loadNextPage = () => {
    if (isLoading || !hasMore) return;
    loadDashboards(true);
  };

  return {
    dashboards,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    reloadDashboards,
  };
};

export default useMyDashboards;
