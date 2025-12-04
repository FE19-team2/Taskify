'use client';

import { useParams } from 'next/navigation';
import Layout from './_components/Layout';

export default function DashboardEditPage() {
  const params = useParams();
  const dashboardId = Number(params.dashboardId);

  return (
    <div className="h-screen bg-black-400">
      <Layout dashboardId={dashboardId} />
    </div>
  );
}
