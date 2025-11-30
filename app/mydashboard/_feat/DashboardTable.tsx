import React from 'react';
import DashboardItemComponent from './DashboardItem';
import { DashboardItem } from '@/lib/utils/dashboard';

interface DashboardTableProps {
  data: DashboardItem[]; // 👈 Dashboard 대신 DashboardItem 사용
  type: 'mine' | 'invited';
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data, type, onAccept, onReject }) => {
  return (
    // 대시보드 목록을 표시하는 그리드 또는 테이블 컨테이너
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((dashboard) => (
        // 각 데이터 항목을 DashboardItem에 전달하여 렌더링
        <DashboardItemComponent
          key={dashboard.id}
          dashboard={{
            id: dashboard.id,
            title: dashboard.title,
            isMine: dashboard.isMine,
          }}
          color={dashboard.color}
          type={type}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default DashboardTable;
