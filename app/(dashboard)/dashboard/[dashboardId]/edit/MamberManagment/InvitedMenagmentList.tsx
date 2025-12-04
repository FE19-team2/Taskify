'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './Pagination';
import InvitationListItem, { Invitation } from './InviteListItem';
import Button from '@/components/ui/button/Button';
import { getDashboardInvitations } from '@/lib/api/services/dashboards.service';
import InviteMemberModal from './InviteMemberModal';

const ITEMS_PER_PAGE = 6; // 페이지당 항목 수 정의

interface InvitedMenagmentListProps {
  dashboardId: number;
}

export default function InvitedMenagmentList({ dashboardId }: InvitedMenagmentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // API로 초대 목록 가져오기
  useEffect(() => {
    const loadInvitations = async () => {
      try {
        setLoading(true);
        const data = await getDashboardInvitations(dashboardId, {
          page: currentPage,
          size: ITEMS_PER_PAGE,
        });
        setInvitations(data.invitations);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('초대 목록을 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvitations();
  }, [dashboardId, currentPage]);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
  }, [totalCount]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 초대 취소 핸들러
  const handleCancelInvitation = async () => {
    // 취소 후 목록 새로고침을 위해 InviteListItem에서 처리
  };

  // 초대 목록 새로고침
  const refreshInvitations = async () => {
    try {
      const data = await getDashboardInvitations(dashboardId, {
        page: currentPage,
        size: ITEMS_PER_PAGE,
      });
      setInvitations(data.invitations);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('초대 목록을 새로고침하는데 실패했습니다:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-transparent rounded-xl space-y-4 w-[438px]">
        <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">초대 내역</h2>
        </div>
        <p className="text-gray-500 py-4 text-center">로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-transparent rounded-xl space-y-4 w-[438px]">
        <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">초대 내역</h2>
          <Button
            variant="primary"
            size="xs"
            className="w-12 h-8 mr-40"
            onClick={() => setShowInviteModal(true)}
          >
            초대
          </Button>
          {/* 공유에서 사용한 아이콘 삽입*/}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/*  멤버 목록 */}
        <div>
          {invitations.map((invitation) => (
            <InvitationListItem
              key={invitation.id}
              invitation={invitation}
              dashboardId={dashboardId}
              onCancel={handleCancelInvitation}
              onCancelSuccess={refreshInvitations}
            />
          ))}
          {invitations.length === 0 && (
            <p className="text-gray-500 py-4 text-center">등록된 초대 내역이 없습니다.</p>
          )}
        </div>
      </div>

      {showInviteModal && (
        <InviteMemberModal
          dashboardId={dashboardId}
          onClose={() => setShowInviteModal(false)}
          onSuccess={refreshInvitations}
        />
      )}
    </>
  );
}
