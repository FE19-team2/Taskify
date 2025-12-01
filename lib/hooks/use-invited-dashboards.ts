// use-invited-dashboards.ts

'use client';

import { useState, useCallback, useEffect } from 'react';
import { DashboardItem } from '../utils/dashboardpros';
import { ca, tr } from 'zod/locales';
import { set } from 'zod';

// --- Mock 설정 ---
const PAGE_SIZE = 10; // 한 번에 불러올 데이터 개수
const TOTAL_ITEMS = 50; // 총 데이터 개수

interface RawInvitationData {
  id: number;
  title: string;
  inviter: string;
}

const mockInvitationData: RawInvitationData[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  title: `초대 대시보드 ${i + 1} (Mock)`,
  inviter: i % 2 === 0 ? '김코드' : '박테스트',
}));

const mapToDashboardItem = (raw: RawInvitationData): DashboardItem => ({
  id: raw.id,
  title: raw.title,
  color: '#30A9DE',
  isMine: false,
  inviter: raw.inviter,
});
// --------------------

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
  const [allInvitations, setAllInvitations] = useState(mockInvitationData);
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  const filteredInvitations = allInvitations.filter((inv) =>
    inv.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  const loadDashboards = useCallback(
    async (append: boolean) => {
      if (!hasMore && append) return;
      if (isLoading) return;

      setIsLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const startIndex = append ? cursor : 0;
        const endIndex = startIndex + PAGE_SIZE;

        const chunk = filteredInvitations.slice(startIndex, endIndex);

        const newDashboardItems: DashboardItem[] = chunk.map(mapToDashboardItem);

        setDashboards((prev) => (append ? [...prev, ...newDashboardItems] : newDashboardItems));

        const nextCursor = startIndex + newDashboardItems.length;
        setCursor(nextCursor);

        if (nextCursor < filteredInvitations.length) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('대시보드 로드 중 오류 발생:', error);
        setError(error instanceof Error ? error : new Error('알 수 없는 오류'));
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [hasMore, isLoading, filteredInvitations, cursor],
  );

  useEffect(() => {
    setCursor(0);
    setHasMore(true);
    setDashboards([]);
    if (!isLoading) {
      loadDashboards(false);
    }
  }, [reloadKey, filteredInvitations.length, searchKeyword]);

  const loadNextPage = () => {
    if (isLoading || !hasMore) return;
    loadDashboards(true);
  };

  return {
    dashboards,
    isLoading,
    error: null,
    hasMore,
    loadNextPage,
    reloadDashboards,
    searchKeyword,
    setSearchKeyword,
  };
};

export default useInvitedDashboards;
