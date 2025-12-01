// components/layout/Sidebar.tsx (부분 예시)

import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import { Icon } from '@/components/ui/Icons/Icon';

interface SidebarProps {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar = ({ userName, isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`
                w-[220px] md:w-64 flex flex-col border-r border-gray-700 bg-black-600 fixed h-full z-50 transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
    >
      <SidebarHeader />

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <button className="text-gray-200 hover:text-white transition flex items-center justify-between w-full cursor-pointer whitespace-nowrap ">
          <span>대시보드 추가</span> <Icon name="PlusIcon" className="w-[12.5px] h-[12.5px]" />
        </button>
      </div>
      <div>
        <SidebarFooter userName={userName} />
      </div>
    </aside>
  );
};

export default Sidebar;
