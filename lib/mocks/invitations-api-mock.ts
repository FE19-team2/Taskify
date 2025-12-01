import { useState, useCallback, useMemo } from 'react';

//  API 응답 구조에 맞게 Mock 데이터를 정의 (invitations.service.ts 응답 구조 참고)
const RAW_MOCK_INVITATIONS = [
  // Invitation[] 구조와 유사하게 Mocking
  { id: 501, dashboard: { id: 201, title: '영업팀 Q3 계획' } },
  { id: 502, dashboard: { id: 202, title: '디자인 프로젝트' } },
];

const PAGE_SIZE = 5;

// 💡 2. Hook 생성 (useReceivedInvitations의 Mock 버전)
export const useReceivedInvitationsMock = () => {
  // 훅이 관리할 Mock 상태 (초대장 ID와 DashboardItem으로 매핑된 최종 데이터)
  const [mockData, setMockData] = useState(
    RAW_MOCK_INVITATIONS.map((inv) => ({
      invitationId: inv.id,
      dashboardItem: {
        id: inv.dashboard.id,
        title: inv.dashboard.title,
        isMine: false,
        color: '#999999',
      },
    })),
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [cursor, setCursor] = useState(0); // 현재 페이지의 끝 인덱스 또는 ID
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 3. 검색 로직 (훅 내부에서 필터링)
  const filteredData = useMemo(() => {
    if (!searchTerm) return mockData;
    return mockData.filter((item) =>
      item.dashboardItem.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [mockData, searchTerm]);

  // 4. 무한 스크롤 / 페이지네이션 로직 (fetchInvitations 대체)
  const loadInvitations = useCallback(
    async (isInitialLoad: boolean = false) => {
      if (!isInitialLoad && !hasMore) return;

      setIsLoading(true);
      // API 통신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 커서 기반 페이지네이션 시뮬레이션
      let nextData;

      if (isInitialLoad) {
        nextData = filteredData.slice(0, PAGE_SIZE);
        setCursor(PAGE_SIZE);
      } else {
        nextData = filteredData.slice(cursor, cursor + PAGE_SIZE);
        setCursor((prev) => prev + PAGE_SIZE);
      }

      // 데이터가 더 있는지 확인
      if (cursor + PAGE_SIZE >= filteredData.length) {
        setHasMore(false);
      }

      setIsLoading(false);
      return nextData;
    },
    [hasMore, filteredData, cursor],
  );

  // 5. 수락/거절 (Mutation 대체)
  const handleAccept = useCallback((id: number) => {
    setMockData((prev) => prev.filter((item) => item.invitationId !== id));
    // 알림 또는 UI 업데이트 로직 추가
    alert(`[Mock] 초대 ID ${id} 수락 완료.`);
  }, []);

  const handleDecline = useCallback((id: number) => {
    setMockData((prev) => prev.filter((item) => item.invitationId !== id));
    // 알림 또는 UI 업데이트 로직 추가
    alert(`[Mock] 초대 ID ${id} 거절 완료.`);
  }, []);

  return {
    invitations: filteredData.slice(0, cursor), // 현재 커서까지의 데이터 반환
    isLoading,
    error: null,
    searchTerm,
    setSearchTerm,
    loadMore: loadInvitations, // 무한 스크롤 시 호출될 함수
    hasMore,
    handleAccept,
    handleDecline,
  };
};
