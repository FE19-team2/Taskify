import { useState, useCallback, useEffect } from 'react';
import { mockDashboardApiData, RawDashboardApiData } from './dashboard-data';
import { DashboardItem } from '@/lib/utils/dashboardpros';

const PAGE_SIZE = 5;

const mapToDashboardItem = (raw: RawDashboardApiData): DashboardItem => ({
  id: raw.id,
  title: raw.title,
  color: raw.color,
  isMine: raw.createdByMe,
});

export const useMyDashboardsMock = () => {
  const [allDashboards, setAllDashboards] = useState<RawDashboardApiData[]>(mockDashboardApiData);
  const [displayedDashboards, setDisplayedDashboards] = useState<DashboardItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지네이션 로직 시뮬레이션
  const loadPage = useCallback(
    (page: number) => {
      setIsLoading(true);
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      const chunk = allDashboards.slice(startIndex, endIndex);

      setTimeout(() => {
        const mappedChunk = chunk.map(mapToDashboardItem);

        if (page === 1) {
          setDisplayedDashboards(mappedChunk);
        } else {
          setDisplayedDashboards((prev) => [...prev, ...mappedChunk]);
        }
        setCurrentPage(page);
        setIsLoading(false);
      }, 300);
    },
    [allDashboards],
  );

  const handleCreateDashboard = useCallback(
    (title: string, color: string) => {
      const newDashboard: RawDashboardApiData = {
        id: Date.now(),
        title: title,
        color: color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdByMe: true,
        userId: 1,
      };
      setAllDashboards((prev) => [newDashboard, ...prev]);
      loadPage(1);
    },
    [loadPage],
  );

  useEffect(() => {
    Promise.resolve().then(() => loadPage(1));
  }, [loadPage]);

  const totalPages = Math.ceil(allDashboards.length / PAGE_SIZE);

  return {
    dashboards: displayedDashboards,
    isLoading,
    error: null,
    totalCount: allDashboards.length,
    currentPage,
    totalPages,
    loadPage,
    handleCreateDashboard,
  };
};
