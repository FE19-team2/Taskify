// components/Layout.tsx

'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
//mport DeleteModal from './DeleteModal';
import { ActiveContent } from '../editType/EditTypes'; // 타입 경로 확인

export default function Layout() {
  const [activeContent, setActiveContent] = useState<ActiveContent>('dashboard');

  // 1. 메인 콘텐츠 변경 핸들러
  const handleSidebarClick = (content: ActiveContent) => {
    setActiveContent(content);
  };

  // 2. 삭제 모달 열기 핸들러
  const handleDeleteClick = () => {
    // 콘텐츠는 그대로 두고 모달만 엽니다.
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar에 상태 변경 함수 전달 */}
      <Sidebar
        activeContent={activeContent}
        onContentChange={handleSidebarClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Main 영역에 현재 활성화된 상태 전달 */}
      <main className="flex-1 p-8 overflow-y-auto">
        <MainContent activeContent={activeContent} />
      </main>

      {/* 모달 조건부 렌더링 */}
      {/* {isModalOpen && <DeleteModal onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
}
