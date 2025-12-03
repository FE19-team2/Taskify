'use client';

import { useState, useEffect } from 'react';
import { DashboardItem } from '../utils/dashboardpros';
import { getDashboards } from '../api/services/dashboards.service';

const PAGE_SIZE = 10;

interface DashboardApiData {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

interface DashboardApiResponse {
  dashboards: DashboardApiData[];
  totalCount: number;
}

const mapToDashboardItem = (raw: DashboardApiData): DashboardItem => ({
  id: raw.id,
  title: raw.title,
  color: raw.color,
  isMine: raw.createdByMe,
});

interface UseMyDashboardsReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  loadPage: (page: number) => void;
}

const useMyDashboards = (): UseMyDashboardsReturn => {
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPage = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response: DashboardApiResponse = await getDashboards({
        page,
        size: PAGE_SIZE,
      });

      setDashboards(response.dashboards.map(mapToDashboardItem));
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.totalCount / PAGE_SIZE));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('대시보드 로딩 오류'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  return { dashboards, isLoading, error, currentPage, totalPages, loadPage };
};

export default useMyDashboards;
