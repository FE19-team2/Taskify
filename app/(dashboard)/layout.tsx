import Sidebar from '@/app/(dashboard)/mydashboard/_components/layout/Sidebar';
import DashboardHeader from './mydashboard/edit/DashboardHeader';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="  h-screen text-gray-100 bg-black-500">
      <div className={'w-64 fixed h-full z-50 bg-black-500 border-r border-gray-800 '}>
        {/*더미 props*/}

        <Sidebar
          userName="Loading"
          isOpen={true}
          onClose={() => {}}
          myDashboards={[]}
          currentPage={0}
          totalPages={0}
          gotoPage={() => {}}
        />
      </div>

      <div className={`relative flex flex-col ml-64`}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
