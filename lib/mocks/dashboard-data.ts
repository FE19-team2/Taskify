// src/lib/mocks/dashboard-data.ts (업데이트)

// getDashboards 응답의 dashboards 배열 요소 구조
export interface RawDashboardApiData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean; // 👑 표시를 위해 true/false를 섞어서 테스트해야 함
  userId: number;
}

// 💡 Mock 데이터 (페이지네이션 테스트를 위해 충분한 양)
export const mockDashboardApiData: RawDashboardApiData[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `나의 대시보드 ${i + 1} (Mock)`,
  color: i % 3 === 0 ? '#FF7070' : '#40C0F0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdByMe: i % 5 !== 0, // 약 80%는 내가 만든 것(👑)으로 설정
  userId: 1,
}));
