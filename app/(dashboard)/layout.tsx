'use client';

import React, { useState, useCallback, createContext, useContext, useEffect } from 'react';
import Sidebar from '@/app/(dashboard)/mydashboard/_components/layout/Sidebar';
import DashboardHeader from './mydashboard/_components/dashboard/DashboardHeader';
import useMyDashboards from '@/lib/hooks/use-mydashboards';
import useUser from '@/lib/hooks/use-user';
import { ConfirmWithInputModal } from '@/components/ui/modal/ConfirmWithInputModal';
import { DialogModal } from '@/components/ui/modal/Dialog';
import { createDashboard } from '@/lib/api/services/dashboards.service';
import { useConfirmModalStore } from '@/components/ui/modal/ConfirmModalStore';
import { useRouter } from 'next/navigation';
import ProfileEditModal from './dashboard/[dashboardId]/edit/_components/ProfileEditModal';
import PasswordChangeModal from './dashboard/[dashboardId]/edit/_components/PasswordChangeModal';
import { getUserProfile } from '@/lib/api/services/users.service';

interface Props {
  children: React.ReactNode;
}

interface DashboardContextType {
  openCreateModal: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within DashboardLayout');
  }
  return context;
};

const DashboardLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { user: hookUser } = useUser();
  const [user, setUser] = useState(hookUser);
  const router = useRouter();
  const { color, dashboardTitle } = useConfirmModalStore();

  const {
    sidebarDashboards,
    sidebarCurrentPage,
    sidebarTotalPages,
    gotoSidebarPage,
    reloadDashboards,
  } = useMyDashboards();

  // 사용자 정보 직접 로드
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    if (!user) {
      loadUser();
    }
  }, [user]);

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleProfileClick = useCallback(() => {
    setShowProfileModal(true);
  }, []);

  const handleProfileSuccess = useCallback(async () => {
    // 프로필 업데이트 후 사용자 정보 다시 로드
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to reload user:', error);
    }
  }, []);

  useEffect(() => {
    const handleOpenPasswordModal = () => {
      setShowProfileModal(false);
      setShowPasswordModal(true);
    };

    const handleReloadDashboards = () => {
      reloadDashboards();
    };

    window.addEventListener('openPasswordModal', handleOpenPasswordModal);
    window.addEventListener('reloadDashboards', handleReloadDashboards);
    return () => {
      window.removeEventListener('openPasswordModal', handleOpenPasswordModal);
      window.removeEventListener('reloadDashboards', handleReloadDashboards);
    };
  }, [reloadDashboards]);

  const handleCreateDashboard = useCallback(async () => {
    if (!dashboardTitle.trim()) {
      setDialogMessage('대시보드 이름을 입력해주세요.');
      setDialogOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const newDashboard = await createDashboard({
        title: dashboardTitle,
        color: color,
      });

      // 대시보드 목록 새로고침
      reloadDashboards();

      setDialogMessage('대시보드가 생성되었습니다.');
      setDialogOpen(true);
      setIsCreateModalOpen(false);

      // 생성된 대시보드로 이동
      router.push(`/dashboard/${newDashboard.id}`);
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
      setDialogMessage('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardTitle, color, router, reloadDashboards]);

  const currentUserName = user ? user.nickname : 'Loading';

  return (
    <DashboardContext.Provider value={{ openCreateModal: handleOpenCreateModal }}>
      <div className="h-screen text-gray-100 bg-black-500 overflow-hidden">
        <DashboardHeader onSidebarToggle={handleSidebarToggle} />

        {isSidebarOpen && (
          <div onClick={handleSidebarClose} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
        )}

        <Sidebar
          userName={currentUserName}
          userEmail={user?.email || ''}
          profileImageUrl={user?.profileImageUrl || null}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          myDashboards={sidebarDashboards}
          currentPage={sidebarCurrentPage}
          totalPages={sidebarTotalPages}
          gotoPage={gotoSidebarPage}
          onCreateDashboard={handleOpenCreateModal}
          onProfileClick={handleProfileClick}
        />

        <div className="relative flex flex-col h-screen ml-0 md:ml-64 overflow-hidden">
          {children}
        </div>

        <ConfirmWithInputModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          title="새로운 대시보드"
          placeholder="대시보드 이름을 입력해주세요"
          confirmText="생성"
          cancelText="취소"
          onChange={() => {}}
          onConfirm={handleCreateDashboard}
          hasColorBoard={true}
          isLoading={isLoading}
        />

        <DialogModal open={dialogOpen} onOpenChange={setDialogOpen} description={dialogMessage} />

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
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
