// components/Layout.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ProfileEditModal from './ProfileEditModal';
import PasswordChangeModal from './PasswordChangeModal';
import { ActiveContent } from '../editType/EditTypes';
import { getDashboardById, deleteDashboard } from '@/lib/api/services/dashboards.service';
import { getUserProfile } from '@/lib/api/services/users.service';
import { User } from '@/lib/api/validations/users';
import { DialogModal } from '@/components/ui/modal/Dialog';

interface LayoutProps {
  dashboardId: number;
}

export default function Layout({ dashboardId }: LayoutProps) {
  const router = useRouter();
  const [activeContent, setActiveContent] = useState<ActiveContent>('dashboard');
  const [isOwner, setIsOwner] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashboardData, userData] = await Promise.all([
          getDashboardById(dashboardId),
          getUserProfile(),
        ]);
        setIsOwner(dashboardData.createdByMe);
        setUser(userData);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    };

    loadData();
  }, [dashboardId]);

  useEffect(() => {
    const handleOpenPasswordModal = () => {
      setShowProfileModal(false);
      setShowPasswordModal(true);
    };

    window.addEventListener('openPasswordModal', handleOpenPasswordModal);
    return () => {
      window.removeEventListener('openPasswordModal', handleOpenPasswordModal);
    };
  }, []);

  // 1. 메인 콘텐츠 변경 핸들러
  const handleSidebarClick = (content: ActiveContent) => {
    setActiveContent(content);
  };

  // 2. 삭제 모달 열기 핸들러
  const handleDeleteClick = async () => {
    if (!isOwner) {
      setDialogMessage('대시보드 소유자만 삭제할 수 있습니다.');
      setDialogOpen(true);
      return;
    }

    if (!confirm('정말로 이 대시보드를 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteDashboard(dashboardId);

      // 사이드바 대시보드 목록 새로고침
      window.dispatchEvent(new CustomEvent('reloadDashboards'));

      setDialogMessage('대시보드가 삭제되었습니다.');
      setDialogOpen(true);
      router.push('/mydashboard');
    } catch (error) {
      console.error('대시보드 삭제에 실패했습니다:', error);
      setDialogMessage('대시보드 삭제에 실패했습니다.');
      setDialogOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleProfileSuccess = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('사용자 정보 갱신 실패:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-transparent">
        {/* Sidebar에 상태 변경 함수 전달 */}
        <Sidebar
          activeContent={activeContent}
          onContentChange={handleSidebarClick}
          onDeleteClick={handleDeleteClick}
          isOwner={isOwner}
          isDeleting={isDeleting}
        />

        {/* Main 영역에 현재 활성화된 상태 전달 */}
        <main className="flex-1 p-8 overflow-y-auto">
          <MainContent activeContent={activeContent} dashboardId={dashboardId} />
        </main>
      </div>

      {/* 프로필 편집 모달 */}
      {showProfileModal && user && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSuccess={handleProfileSuccess}
        />
      )}

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <PasswordChangeModal onClose={() => setShowPasswordModal(false)} onSuccess={() => {}} />
      )}

      <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />
    </>
  );
}
