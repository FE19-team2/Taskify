'use client';

import { useState, useEffect, useCallback } from 'react';
import { getInvitations } from '@/lib/api/services/invitations.service';
import { DashboardItem, DashboardHookReturn } from '@/lib/utils/dashboard';
// 🚨 임시 타입 가정 (실제 프로젝트 타입을 사용하세요)

// 💡 API가 반환하는 개별 초대 객체 타입 (API 명세 기반)
interface InvitationItem {
  id: number; // 초대 ID
  dashboard: DashboardItem; // 초대받은 대시보드 객체
  // ... 기타 속성 (예: inviter)
}

const ITEMS_PER_PAGE = 10;

const useInvitedDashboards = () => {
  // dashboards는 InvitationItem에서 DashboardItem을 추출한 배열입니다.
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined); // 💡 무한 스크롤을 위해 cursorId 사용
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 💡 데이터 로딩 함수: 새로운 데이터를 추가하거나 (append=true), 새로 덮어씁니다 (append=false)
  const loadDashboards = useCallback(
    async (append = true, resetCursor = false) => {
      if (!hasMore && append) return;
      if (isLoading) return; // 중복 호출 방지

      // 검색 또는 새로고침 시에는 커서를 초기화합니다.
      const targetCursorId = resetCursor ? undefined : cursorId;
      const targetPageSize = ITEMS_PER_PAGE;

      // 초기 로드 시 로딩 상태를 명확히 보여줍니다.
      if (!append) setIsLoading(true);
      setError(null);

      try {
        // 💡 실제 API 호출 적용
        const response = await getInvitations({
          cursorId: targetCursorId,
          size: targetPageSize,
          title: searchKeyword || undefined,
        });

        // 💡 API 응답을 DashboardItem 배열로 변환
        const newDashboardItems = response.invitations.map((invitation) => ({
          id: invitation.dashboard.id,
          title: invitation.dashboard.title,
          isMine: false,
          // 초대 상태를 보여줘야 한다면 여기서 추가 (예: status: 'pending')
          color: '#999999',
        }));

        setDashboards((prev) => (append ? [...prev, ...newDashboardItems] : newDashboardItems));

        //setHasMore(response.hasNext);

        if (response.cursorId) {
          setCursorId(response.cursorId);
          setHasMore(true);
        } else {
          setCursorId(undefined); // 다음 커서가 없으면 초기화
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
    }, 300); // 300ms 디바운스 시간 가정

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  // 💡 무한 스크롤을 위해 다음 페이지 데이터를 불러오는 함수
  const loadNextPage = () => {
    // 이미 로딩 중이거나 더 이상 데이터가 없으면 실행하지 않음
    if (isLoading || !hasMore) return;
    loadDashboards(true, false); // append=true, resetCursor=false
  };

  // 💡 새로고침 함수: 검색 키워드를 유지한 채 1페이지부터 다시 로드
  const reloadDashboards = useCallback(() => {
    setCursorId(undefined);
    setHasMore(true);
    setDashboards([]); // 상태 초기화 후
    loadDashboards(false, true); // 덮어쓰기 방식으로 로드
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
