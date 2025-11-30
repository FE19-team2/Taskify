'use client';
// use-mydashboards.ts

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
  // 💡 수정: 누락되었던 핵심 상태들 선언
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined); // 다음 커서 ID
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 유무
  const [reloadKey, setReloadKey] = useState(0); // 새로고침 트리거 상
  // 💡 목록을 새로고침하도록 트리거하는 함수
  const reloadDashboards = useCallback(() => {
    setReloadKey((prev) => prev + 1); // 상태를 변경하여 useEffect 재실행 유도
    setCursorId(1); // 새로고침 시 1페이지로 돌아가도록 설정
  }, []);

  const loadDashboards = useCallback(
    async (append: boolean) => {
      if (!hasMore && append) return;
      if (isLoading) return; // 중복 호출 방지

      // 초기 로드 시 로딩 상태를 명확히 보여줍니다.
      if (!append) setIsLoading(true);
      setError(null);

      try {
        // 💡 실제 API 호출 적용 (커서와 사이즈 기반)
        const response: GetDashboardsResponse = await getDashboards({
          cursorId: cursorId,
          size: ITEMS_PER_PAGE,
        });

        // API 응답의 'dashboards' 배열 사용
        const newDashboardItems: DashboardItem[] = response.dashboards.map((item) => ({
          id: item.id,
          title: item.title,
          color: item.color || '#000000',
          isMine: true,
        }));

        setDashboards((prev) =>
          // append=true (스크롤 시) -> 기존 데이터에 추가
          append
            ? [...prev, ...newDashboardItems]
            : // append=false (새로고침 또는 초기 로드 시) -> 새로운 데이터로 덮어쓰기
              newDashboardItems,
        );

        if (response.cursorId) {
          setCursorId(response.cursorId);
          setHasMore(true);
        } else {
          setCursorId(undefined); // 다음 커서가 없으면 초기화
          setHasMore(false); // 더 이상 데이터가 없음
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
    // 상태 초기화 후 1페이지(커서=undefined)부터 로드 (덮어쓰기)
    setCursorId(undefined);
    setHasMore(true);
    setDashboards([]);

    if (reloadKey >= 0) {
      setIsLoading(true);
      loadDashboards(false);
    }
  }, [reloadKey]); // reloadKey가 변경될 때마다 초기화 및 재검색이 이루어집니다.

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
