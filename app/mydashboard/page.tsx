// app/(dashboard)/page.tsx

import React from 'react';
import DashboardHeader from './_components/dashboard/DashboardHeader';
import DashboardSection from './_components/dashboard/DashboardSection';
import EmptyState from './_components/dashboard/EmptyState';
import Sidebar from './_components/layout/Sidebar';

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      {/* 1. 고정된 헤더 */}
      <DashboardHeader />

      {/* 2. 메인 콘텐츠 영역 (Layout의 p-8이 적용됨) */}
      <main className="ml-64 px-10 pt-16">
        {/* 전체 타이틀 ('홈'이라고 가정, 이미지에는 TASKIFY 로고 옆에 위치) */}
        <div className="pt-6">
          <h1 className="text-4xl font-extrabold text-white mb-10">홈</h1>
        </div>
        {/* --- 내 대시보드 섹션 --- */}
        <DashboardSection title="내 대시보드">
          <EmptyState type="mine" />
        </DashboardSection>

        {/* --- 초대받은 대시보드 섹션 --- */}
        <DashboardSection title="초대받은 대시보드">
          <EmptyState type="invited" />
        </DashboardSection>
      </main>
    </>
  );
};

export default DashboardPage;
