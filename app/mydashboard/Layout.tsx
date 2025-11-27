// app/(dashboard)/layout.tsx

import Sidebar from './_components/layout/Sidebar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}
const SidebarWidth = 'w-[340px]';
const SidebarWidthRem = 'w-[21.25rem]';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="  h-screen bg-black-500 text-gray-100">
      <div
        className={`w-64 fixed h-full z-50 bg-black-500 border-r border-gray-800 ${SidebarWidth}`}
      >
        <Sidebar />
      </div>

      {/* 2. 메인 컨텐츠 영역: 남은 공간 모두 사용 */}
      <div className={`relative flex flex-col ml-[340px]`}>
        {/* 헤더 및 실제 페이지 콘텐츠가 들어갈 영역 */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
