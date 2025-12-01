import React from 'react';
import DashboardItemComponent from './DashboardItem';
import { DashboardItem } from '@/lib/utils/dashboard';

interface DashboardTableProps {
  data: DashboardItem[];
  type: 'mine' | 'invited';
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data, type, onAccept, onReject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((dashboard) => (
        <DashboardItemComponent
          key={dashboard.id}
          dashboard={dashboard}
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
