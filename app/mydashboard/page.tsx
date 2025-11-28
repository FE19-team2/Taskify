// app/(dashboard)/page.tsx

import DashboardHeader from './_components/dashboard/DashboardHeader';
import DashboardSection from './_components/dashboard/DashboardSection';
import EmptyState from './_components/dashboard/EmptyState';
import Sidebar from './_components/layout/Sidebar';

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <div>
        <DashboardHeader />
      </div>

      <main className="ml-64 px-10 pt-16">
        <div className="pt-6">
          <h1 className="text-4xl font-extrabold text-white mb-10">홈</h1>
        </div>
        <DashboardSection title="내 대시보드">
          <EmptyState type="mine" />
        </DashboardSection>

        <DashboardSection title="초대받은 대시보드">
          <EmptyState type="invited" />
        </DashboardSection>
      </main>
    </>
  );
};

export default DashboardPage;
