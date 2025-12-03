'use client';

import React from 'react';
import DashboardEditForm from '../DashboardEditForm';
import DashboardHeader from '../EditDashboardHeader';
import GoBackButton from '../MamberManagment/GobackButton';
export default function DashboardEdit() {
  return (
    <div
      className={`max-w-[1100px] mx-auto relative min-h-screen text-white box-border  flex gap-10`}
    >
      <div className="absolute top-17 right-65">
        <GoBackButton />
      </div>

      <div className="">
        <DashboardHeader />
      </div>

      <main className="absolute top-15  pt-8 flex-1">
        <div className="">
          <h1 className="font-bold text-2xl">대시보드 편집</h1>
        </div>
        <div>
          <DashboardEditForm />
        </div>
      </main>
    </div>
  );
}
