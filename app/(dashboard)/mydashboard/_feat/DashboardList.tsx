// DashboardList.tsx

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyState from '../_components/dashboard/EmptyState';
import DashboardTable from './DashboardTable';
import ErrorDisplay from '../_components/dashboard/ErrorDisplay';
import LoadingSpinner from '../_components/dashboard/Loading';
import { DashboardItem } from '@/lib/utils/dashboardpros';

interface DashboardListProps {
  type: 'mine' | 'invited';
  dashboards: DashboardItem[];
  isLoading: boolean;
  error: Error | null;
  currentPage?: number;
  totalPages?: number;
  gotoPage?: (page: number) => void;
  hasMore?: boolean;
  loadNextPage?: () => void;
  onCreateClick: () => void;
  onAccept?: (dashboardId: number) => void;
  onReject?: (dashboardId: number) => void;
}

const DashboardList = (props: DashboardListProps) => {
  const { type, dashboards, error, hasMore, loadNextPage, onCreateClick, onAccept, onReject } =
    props;

  // 데이터가 없을 때 EmptyState 표시
  if (dashboards.length === 0) {
    const emptyStateProps = {
      type: type,
      onCreateClick: onCreateClick,
    };

    if (error) {
      return (
        <EmptyState {...emptyStateProps}>
          <ErrorDisplay message={error.message || '데이터를 불러올 수 없습니다.'} />
        </EmptyState>
      );
    }

    return <EmptyState {...emptyStateProps} />;
  }

  const dashboardTableProps = {
    data: dashboards,
    type: type,
    onAccept: type === 'invited' ? onAccept : undefined,
    onReject: type === 'invited' ? onReject : undefined,

    currentPage: type === 'mine' ? props.currentPage : undefined,
    totalPages: type === 'mine' ? props.totalPages : undefined,
    gotoPage: type === 'mine' ? props.gotoPage : undefined,
    isLoading: props.isLoading,
    onCreateDashboard: onCreateClick,
  };

  if (type === 'invited' && hasMore !== undefined && loadNextPage) {
    return (
      <InfiniteScroll
        dataLength={dashboards.length}
        next={loadNextPage}
        hasMore={hasMore}
        loader={hasMore ? <LoadingSpinner /> : null}
        endMessage={
          <p className="text-center text-gray-500 my-4 text-sm">모든 목록을 불러왔습니다.</p>
        }
      >
        <DashboardTable {...dashboardTableProps} />
      </InfiniteScroll>
    );
  }

  return (
    <div className="space-y-4 ">
      <DashboardTable {...dashboardTableProps} />
    </div>
  );
};

export default DashboardList;
