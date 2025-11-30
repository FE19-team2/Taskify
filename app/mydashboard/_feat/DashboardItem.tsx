import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icons/Icon';
import { cn } from '@/lib/utils/twmerge';

// 🚨 가정: 대시보드 데이터 타입 정의
interface Dashboard {
  id: number;
  title: string;
  isMine: boolean;
  // ... 기타 속성 ...
}

interface DashboardItemProps {
  dashboard: Dashboard;
  type: 'mine' | 'invited'; // 💡 타입 추가
  onAccept?: (id: number) => void; // 💡 핸들러 추가
  onReject?: (id: number) => void; // 💡 핸들러 추가
  color: string;
}

// 💡 변경된 부분: React.FC<DashboardItemProps> 대신 Props 타입을 함수 인수에 직접 적용
const DashboardItem = ({ dashboard, type, onAccept, onReject }: DashboardItemProps) => {
  const { id, title, isMine } = dashboard;

  // 💡 내가 만든 대시보드인 경우 'crown' 아이콘을 보여줍니다.
  const CrownIcon = isMine && (
    <div className="ml-2 flex items-center text-yellow-400">
      <Icon name="CrownIcon" className="w-4 h-4" />
    </div>
  );
  const InvitationButtons = type === 'invited' && (
    <div className="flex space-x-2 shrink-0">
      <button
        // e.preventDefault()로 Link의 페이지 이동을 막고 핸들러 실행
        onClick={(event) => {
          event.preventDefault();
          onAccept && onAccept(id);
        }}
        className="px-3 py-1 text-sm font-semibold text-green-400 border border-green-400 rounded-md hover:bg-green-900 transition"
      >
        수락
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          onReject && onReject(id);
        }}
        className="px-3 py-1 text-sm font-semibold text-red-400 border border-red-400 rounded-md hover:bg-red-900 transition"
      >
        거절
      </button>
    </div>
  );
  return (
    <Link
      href={`/dashboard/${id}`}
      className={cn(
        'flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 cursor-pointer',
      )}
    >
      {/* 대시보드 제목 */}
      <span className="text-white font-semibold truncate">{title}</span>

      {/* 👑 크라운 아이콘 조건부 렌더링 */}
      {CrownIcon}
      {InvitationButtons}
    </Link>
  );
};

export default DashboardItem;
