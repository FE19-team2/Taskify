import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import { Icon } from '@/components/ui/Icons/Icon';
import { DashboardItem } from '@/lib/utils/dashboardpros';
import SideButton from '@/components/ui/button/SideButton';
import Link from 'next/link';
interface SidebarProps {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  myDashboards: DashboardItem[];
  currentPage: number;
  totalPages: number;
  gotoPage: (page: number) => void;
  onCreateDashboard?: () => void;
}
const Sidebar = ({
  userName,
  isOpen,
  myDashboards,
  currentPage,
  totalPages,
  gotoPage,
  onCreateDashboard,
}: SidebarProps) => {
  return (
    <aside
      className={`
                w-64 flex flex-col border-r border-gray-700 bg-black-600 fixed 
                h-screen z-50 transition-transform duration-300 overflow-hidden
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
`}
    >
      <div>
        <SidebarHeader />
      </div>
      <div className="grow py-4 px-3">
        <button
          onClick={onCreateDashboard}
          className="text-gray-200 hover:text-white transition flex items-center justify-between w-full cursor-pointer whitespace-nowrap "
        >
          <span>대시보드 추가</span> <Icon name="PlusIcon" className="w-[12.5px] h-[12.5px]" />
        </button>
        <Link
          href="/mydashboard"
          className="flex items-center mt-4 gap-2 hover:opacity-80 transition cursor-pointer"
        >
          <Icon name="HomeIcon" className=" w-6 h-6" />
          <span className="ml-2 text-white font-medium">홈</span>
        </Link>
        {myDashboards.slice(0, 9).map((dashboard) => (
          <div key={dashboard.id} className="mt-3 ">
            <Link href={`/dashboard/${dashboard.id}`}>
              <SideButton
                label={dashboard.title}
                hasHash={true}
                hasCrown={dashboard.isMine}
                key={dashboard.id}
                className="flex items-center justify-between p-2 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition cursor-pointer"
              >
                <span className="truncate">{dashboard.title}</span>

                {dashboard.isMine && (
                  <Icon name="CrownIcon" className="w-4 h-4 text-brand-400 ml-2 shrink-0 " />
                )}
              </SideButton>
            </Link>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-2  border-gray-700  px-2">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center text-gray-400 hover:text-white disabled:opacity-30 transition pr-2"
            >
              <Icon name="ArrowLeft" className="w-4 h-4 mr-1" />
              이전
            </button>
            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center text-gray-400 hover:text-white disabled:opacity-30 transition pl-2"
            >
              다음
              <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
      <div className="shrink-0  border-gray-700 px-3 py-4">
        <SidebarFooter userName={userName} />
      </div>
    </aside>
  );
};

export default Sidebar;
