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
    // 💡 dashboards.length가 0일 때 (로딩 중이든, 에러든, 비어있든)

    // 1-1. EmptyState에 전달할 공통 Props
    const emptyStateProps = {
      type: type,
      onCreateClick: onCreateClick,
    };

    // 1-2. 만약 에러가 발생했다면, EmptyState 내부에 ErrorDisplay를 표시합니다.
    if (error) {
      return (
        <EmptyState {...emptyStateProps}>
          <ErrorDisplay message={error.message || '데이터를 불러올 수 없습니다.'} />
        </EmptyState>
      );
    }

    // 1-3. 로딩 중이라면, EmptyState 내부에 로딩 스피너를 표시합니다.
    if (isLoading) {
      return (
        <EmptyState {...emptyStateProps}>
          <LoadingSpinner />
        </EmptyState>
      );
    }

    // 1-4. 순수하게 데이터가 없을 때 (로딩 완료, 에러 없음)
    // 이 경우가 EmptyState가 의도한 '빈 상태'입니다.
    return <EmptyState {...emptyStateProps} />;
  }
  // 3. DashboardTable에 전달할 공통 Props
  const dashboardTableProps = {
    data: dashboards,
    type: type,
    onAccept: props.type === 'invited' ? props.onAccept : undefined,
    onReject: props.type === 'invited' ? props.onReject : undefined,
  };

  // 4. '내 대시보드' (Pagination) 구현
  if (isLoading && dashboards.length === 0) {
    return <LoadingSpinner />;
  } // 5. 'mine'과 'invited' 타입 모두 InfiniteScroll을 사용하도록 통일 (로직 병합)
  // 모든 DashboardListProps 타입은 (mine이든 invited이든) hasMore와 loadNextPage를 가집니다.
  // (DashboardListProps 정의가 MineDashboardListProps | InvitedDashboardListProps로 Discriminated Union이므로 안전합니다.)

  return (
    <InfiniteScroll
      dataLength={dashboards.length} // props는 MineDashboardListProps 또는 InvitedDashboardListProps 타입입니다.
      next={loadNextPage}
      hasMore={hasMore}
      loader={<LoadingSpinner />}
      endMessage={
        <p className="text-center text-gray-500 my-4 text-sm">모든 목록을 불러왔습니다.</p>
      }
    >
      <DashboardTable {...dashboardTableProps} />   {' '}
    </InfiniteScroll>
  );
};

export default DashboardList;
