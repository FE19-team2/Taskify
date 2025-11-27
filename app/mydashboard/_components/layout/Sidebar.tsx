// components/layout/Sidebar.tsx (부분 예시)

import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import Plus from '@/components/ui/Icons/Plus';
const Sidebar = () => {
  return (
    <aside className="w-64 flex flex-col border-r border-gray-700 bg-black-600 fixed h-full">
      <SidebarHeader />

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <button className="text-gray-200 hover:text-white transition flex items-center space-x-25 cursor-pointer">
          <span>대시보드 추가</span> <Plus className="w-[12.5] h-[12.5]" />
        </button>
      </div>

      <SidebarFooter userName="코드잇" />
    </aside>
  );
};

export default Sidebar;
