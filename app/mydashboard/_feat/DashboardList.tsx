// DashboardList.tsx

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DashboardListProps } from '@/lib/utils/dashboard';
import EmptyState from '../_components/dashboard/EmptyState';
import DashboardTable from './DashboardTable';
import ErrorDisplay from '../_components/dashboard/ErrorDisplay';
import LoadingSpinner from '../_components/dashboard/Loading';

const DashboardList = (props: DashboardListProps) => {
  const { dashboards, isLoading, error, type, hasMore, loadNextPage, onCreateClick } = props;

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

    if (isLoading) {
      return (
        <EmptyState {...emptyStateProps}>
          <LoadingSpinner />
        </EmptyState>
      );
    }

    return <EmptyState {...emptyStateProps} />;
  }
  const dashboardTableProps = {
    data: dashboards,
    type: type,
    onAccept: props.type === 'invited' ? props.onAccept : undefined,
    onReject: props.type === 'invited' ? props.onReject : undefined,
  };

  return (
    <InfiniteScroll
      dataLength={dashboards.length}
      next={loadNextPage}
      hasMore={hasMore}
      loader={<LoadingSpinner />}
      endMessage={
        <p className="text-center text-gray-500 my-4 text-sm">모든 목록을 불러왔습니다.</p>
      }
    >
      <DashboardTable {...dashboardTableProps} />
    </InfiniteScroll>
  );
};

export default DashboardList;
