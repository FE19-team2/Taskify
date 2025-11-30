export interface DashboardItem {
  id: number;
  title: string;
  isMine: boolean;
  color: string;
}
interface BaseDashboardListProps {
  dashboards: DashboardItem[];
  // 🚨 추가: 모든 리스트가 로딩 상태와 에러 상태를 가져야 함
  isLoading: boolean;
  error: Error | null;
}
export interface DashboardHookReturn {
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadNextPage: () => void;
  reloadDashboards: () => void;
}
interface InfiniteScrollProps {
  hasMore: boolean;
  loadNextPage: () => void;
}

// 1. Mine (페이지네이션) Props
interface MineDashboardListProps extends BaseDashboardListProps, InfiniteScrollProps {
  type: 'mine';
  dashboards: DashboardItem[];
  onCreateClick: () => void;
  //currentPage: number;
  //totalPages: number;
  //onPageChange: (page: number) => void;
}

// 2. Invited (무한 스크롤) Props
interface InvitedDashboardListProps extends BaseDashboardListProps {
  type: 'invited';
  dashboards: DashboardItem[];
  onCreateClick: () => void;
  loadNextPage: () => void; // 다음 페이지 로드 함수
  hasMore: boolean; // 더 불러올 데이터가 있는지 여부
  onAccept: (dashboardId: number) => void; // 수락 액션
  onReject: (dashboardId: number) => void; // 거절 액션
}

// 전체 Props (Discriminated Union)
export type DashboardListProps = MineDashboardListProps | InvitedDashboardListProps;
