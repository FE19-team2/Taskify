export interface DashboardItem {
  id: number;
  title: string;
  isMine: boolean;
  color: string;
  inviter?: string;
}
interface BaseDashboardListProps {
  dashboards: DashboardItem[];
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

interface MineDashboardListProps extends BaseDashboardListProps, InfiniteScrollProps {
  type: 'mine';
  dashboards: DashboardItem[];
  onCreateClick: () => void;
}

interface InvitedDashboardListProps extends BaseDashboardListProps {
  type: 'invited';
  dashboards: DashboardItem[];
  onCreateClick: () => void;
  loadNextPage: () => void;
  hasMore: boolean;
  onAccept: (dashboardId: number) => void;
  onReject: (dashboardId: number) => void;
}

export type DashboardListProps = MineDashboardListProps | InvitedDashboardListProps;
