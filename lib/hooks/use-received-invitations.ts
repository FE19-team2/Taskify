'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { DashboardItem } from '../utils/dashboardpros';

const SIDEBAR_PAGE_SIZE = 10;
const TEST_PAGE_SIZE = 3;

interface RawDashboardApiData {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

const mockDashboardApiData: RawDashboardApiData[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `나의 대시보드 ${i + 1} (Mock)`,
  color: i % 3 === 0 ? '#FF7070' : '#40C0F0',
  createdByMe: i % 5 !== 0,
}));

const mapToDashboardItem = (raw: RawDashboardApiData): DashboardItem => ({
  id: raw.id,
  title: raw.title,
  color: raw.color,
  isMine: raw.createdByMe,
});
// --------------------

interface PaginationDashboardHookReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  reloadDashboards: () => void;
  handleCreateDashboard: (title: string, color: string) => void; // 메인 페이지네이션 정보

  mainCurrentPage: number;
  mainTotalPages: number;
  gotoMainPage: (page: number) => void; // 사이드바 섹션용 (10개씩)

  sidebarDashboards: DashboardItem[];
  sidebarCurrentPage: number;
  sidebarTotalPages: number;
  gotoSidebarPage: (page: number) => void;

  dataAll: DashboardItem[];
}

const useMyDashboards = (): PaginationDashboardHookReturn => {
  const [allDashboards, setAllDashboards] = useState(mockDashboardApiData);
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [mainCurrentPage, setMainCurrentPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [sidebarCurrentPage, setSidebarCurrentPage] = useState(1);

  const mainTotalPages = Math.ceil(allDashboards.length / TEST_PAGE_SIZE);
  const sidebarTotalPages = Math.ceil(allDashboards.length / SIDEBAR_PAGE_SIZE);
  const gotoSidebarPage = (page: number) => {
    if (page < 1 || page > sidebarTotalPages) return;
    setSidebarCurrentPage(page);
  };
  const gotoMainPage = (page: number) => {
    if (page < 1 || page > mainTotalPages) return;
    setMainCurrentPage(page);
  };
  const fullDashboardList: DashboardItem[] = useMemo(() => {
    return allDashboards.map(mapToDashboardItem);
  }, [allDashboards]);

  const paginatedSidebarList: DashboardItem[] = useMemo(() => {
    const startIndex = (sidebarCurrentPage - 1) * SIDEBAR_PAGE_SIZE;
    const endIndex = startIndex + SIDEBAR_PAGE_SIZE;

    const chunk = fullDashboardList.slice(startIndex, endIndex);
    return chunk;
  }, [fullDashboardList, sidebarCurrentPage]);
  const handleCreateDashboard = useCallback((title: string, color: string) => {
    const newDashboard: RawDashboardApiData = {
      id: Date.now(),
      title: title,
      color: color,
      createdByMe: true,
    };
    setAllDashboards((prev) => [newDashboard, ...prev]);
    setReloadKey((prev) => prev + 1);
    alert(`[Mock] 대시보드 '${title}' 생성 및 목록 갱신 시뮬레이션`);
  }, []);

  const loadDashboards = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const startIndex = (page - 1) * TEST_PAGE_SIZE;
        const endIndex = startIndex + TEST_PAGE_SIZE;

        const chunk = allDashboards.slice(startIndex, endIndex);

        const newDashboardItems: DashboardItem[] = chunk.map(mapToDashboardItem);

        setDashboards(newDashboardItems);

        setMainCurrentPage(page);
      } catch (err) {
        console.error('Failed to load my dashboards (Mock/API):', err);
        setError(
          err instanceof Error ? err : new Error('알 수 없는 대시보드 로딩 오류가 발생했습니다.'),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, allDashboards],
  );

  useEffect(() => {
    if (mainCurrentPage >= 1 && mainCurrentPage <= mainTotalPages && allDashboards.length > 0) {
      loadDashboards(mainCurrentPage);
    }

    if (mainCurrentPage > mainTotalPages && mainTotalPages > 0) {
      console.warn('페이지 범위 초과 감지: 마지막 페이지로 리셋합니다.');
      setMainCurrentPage(mainTotalPages);
    }
  }, [mainCurrentPage, mainTotalPages, allDashboards.length]);

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);
  return {
    // 메인 섹션용
    dashboards, // 3개씩 목록
    isLoading,
    error,
    mainCurrentPage,
    mainTotalPages,
    gotoMainPage,

    // 사이드바 섹션용
    sidebarDashboards: paginatedSidebarList, // 10개씩 목록
    sidebarCurrentPage,
    sidebarTotalPages,
    gotoSidebarPage,

    reloadDashboards,
    handleCreateDashboard,
    dataAll: fullDashboardList,
  };
};

export default useMyDashboards;
