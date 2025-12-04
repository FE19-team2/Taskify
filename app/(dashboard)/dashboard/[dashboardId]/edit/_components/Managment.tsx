// app/mydashboard/edit/MamberManagment/test/page.tsx

'use client';
import React from 'react';
import MemberManagementList from '../MamberManagment/MemberManagmentList';
import InvitedMenagmentList from '../MamberManagment/InvitedMenagmentList';
import GoBackButton from '../MamberManagment/GobackButton';
import DashboardHeader from '@/app/(dashboard)/dashboard/[dashboardId]/edit/DashboardHeader';

interface ManagementProps {
  dashboardId: number;
}

export default function Managment({ dashboardId }: ManagementProps) {
  return (
    <>
      <DashboardHeader />
      <div className="max-w-[1100px] mx-auto relative mt-1">
        <div className="absolute right-65 top-1">
          <GoBackButton />
        </div>
        <div className="w-60"></div>
        <main className="mt-16 space-y-10 grow">
          <h1 className="font-bold text-3xl">멤버 관리</h1>

          {/*  페이지네이션이 적용된 구성원 목록 배치 */}
          <section className="space-y-6">
            <MemberManagementList dashboardId={dashboardId} />
          </section>
          <section className="w-[438px]">
            <InvitedMenagmentList dashboardId={dashboardId} />
          </section>
        </main>
      </div>
    </>
  );
}
