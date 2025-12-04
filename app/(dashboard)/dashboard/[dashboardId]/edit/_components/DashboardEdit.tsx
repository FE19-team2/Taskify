'use client';

import React, { useEffect, useState } from 'react';
import DashboardEditForm from '../DashboardEditForm';
import DashboardHeader from '../DashboardHeader';
import GoBackButton from '../MamberManagment/GobackButton';
import { getDashboardById } from '@/lib/api/services/dashboards.service';

interface DashboardEditProps {
  dashboardId: number;
}

export default function DashboardEdit({ dashboardId }: DashboardEditProps) {
  const [dashboard, setDashboard] = useState<{
    id: number;
    title: string;
    color: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardById(dashboardId);
        setDashboard({
          id: data.id,
          title: data.title,
          color: data.color,
        });
      } catch (error) {
        console.error('대시보드 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [dashboardId]);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto relative min-h-screen text-white flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

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
          {dashboard && (
            <DashboardEditForm
              initial={{
                id: String(dashboard.id),
                name: dashboard.title,
                color: dashboard.color,
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
