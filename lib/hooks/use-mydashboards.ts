'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { DashboardItem } from '../utils/dashboardpros';
import { getDashboards } from '../api/services/dashboards.service';

const SIDEBAR_PAGE_SIZE = 10;
const TEST_PAGE_SIZE = 3;

interface PaginationDashboardHookReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  reloadDashboards: () => void;
  handleCreateDashboard: (title: string, color: string) => void;

  mainCurrentPage: number;
  mainTotalPages: number;
  gotoMainPage: (page: number) => void;

  sidebarDashboards: DashboardItem[];
  sidebarCurrentPage: number;
  sidebarTotalPages: number;
  gotoSidebarPage: (page: number) => void;

  dataAll: DashboardItem[];
}

const useMyDashboards = (): PaginationDashboardHookReturn => {
  const [allDashboards, setAllDashboards] = useState<DashboardItem[]>([]);
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainCurrentPage, setMainCurrentPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [sidebarCurrentPage, setSidebarCurrentPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const mainTotalPages = Math.ceil(allDashboards.length / TEST_PAGE_SIZE);
  const sidebarTotalPages = Math.ceil(allDashboards.length / SIDEBAR_PAGE_SIZE);

  const gotoSidebarPage = useCallback(
    (page: number) => {
      if (page < 1 || page > sidebarTotalPages) return;
      setSidebarCurrentPage(page);
    },
    [sidebarTotalPages],
  );

  const gotoMainPage = useCallback(
    (page: number) => {
      if (page < 1 || page > mainTotalPages) return;
      setMainCurrentPage(page);
    },
    [mainTotalPages],
  );

  const paginatedSidebarList: DashboardItem[] = useMemo(() => {
    const startIndex = (sidebarCurrentPage - 1) * SIDEBAR_PAGE_SIZE;
    const endIndex = startIndex + SIDEBAR_PAGE_SIZE;
    return allDashboards.slice(startIndex, endIndex);
  }, [allDashboards, sidebarCurrentPage]);

  const handleCreateDashboard = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  // 전체 대시보드 목록 로드
  useEffect(() => {
    const fetchAllDashboards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const allData: DashboardItem[] = [];
        let cursorId: number | null = null;

        // 모든 대시보드를 가져올 때까지 반복
        while (true) {
          const params: { size: number; cursorId?: number } = { size: 20 };
          if (cursorId !== null) {
            params.cursorId = cursorId;
          }
          const response = await getDashboards(params);

          const items = response.dashboards.map((dd) => ({
            id: dd.id,
            title: dd.title,
            color: dd.color,
            isMine: dd.createdByMe,
          }));

          allData.push(...items);

          if (!response.cursorId) break;
          cursorId = response.cursorId;
        }

        setAllDashboards(allData);
      } catch (err) {
        console.error('Failed to load dashboards:', err);
        setError(err instanceof Error ? err : new Error('대시보드 로딩 실패'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDashboards();
  }, [reloadKey]);

  // 메인 페이지네이션을 위한 슬라이싱
  useEffect(() => {
    if (mainCurrentPage > mainTotalPages && mainTotalPages > 0) {
      setMainCurrentPage(mainTotalPages);
      return;
    }

    const startIndex = (mainCurrentPage - 1) * TEST_PAGE_SIZE;
    const endIndex = startIndex + TEST_PAGE_SIZE;
    setDashboards(allDashboards.slice(startIndex, endIndex));
  }, [mainCurrentPage, mainTotalPages, allDashboards]);

  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  return {
    dashboards,
    isLoading,
    error,
    mainCurrentPage,
    mainTotalPages,
    gotoMainPage,
    sidebarDashboards: paginatedSidebarList,
    sidebarCurrentPage,
    sidebarTotalPages,
    gotoSidebarPage,
    reloadDashboards,
    handleCreateDashboard,
    dataAll: allDashboards,
  };
};

export default useMyDashboards;
