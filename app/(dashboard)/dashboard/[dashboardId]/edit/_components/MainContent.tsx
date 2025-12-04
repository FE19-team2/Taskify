// components/MainContent.tsx

import React from 'react';
import { ActiveContent } from '../editType/EditTypes';
import DashboardEdit from './DashboardEdit';
import Management from './Managment';

interface MainContentProps {
  activeContent: ActiveContent;
  dashboardId: number;
}

export default function MainContent({ activeContent, dashboardId }: MainContentProps) {
  switch (activeContent) {
    case 'dashboard':
      return <DashboardEdit dashboardId={dashboardId} />;
    case 'members':
      return <Management dashboardId={dashboardId} />;
    default:
      return (
        <div className="text-gray-500 text-center p-10">사이드바에서 메뉴를 선택해 주세요.</div>
      );
  }
}
