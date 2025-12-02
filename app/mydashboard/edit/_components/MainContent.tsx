// components/MainContent.tsx

import React from 'react';
import { ActiveContent } from '../editType/EditTypes';
import DashboardEdit from './DashboardEdit';
import Management from './Managment';

interface MainContentProps {
  activeContent: ActiveContent;
}

export default function MainContent({ activeContent }: MainContentProps) {
  switch (activeContent) {
    case 'dashboard':
      return <DashboardEdit />;
    case 'members':
      return <Management />;
    default:
      return (
        <div className="text-gray-500 text-center p-10">사이드바에서 메뉴를 선택해 주세요.</div>
      );
  }
}
