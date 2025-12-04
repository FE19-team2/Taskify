'use client';

import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import InvitedMock from '@/invitation_mock.json';
import InvitationListItem, { Invitation } from './InviteListItem';
import Button from '@/components/ui/button/Button';

const allInvitations: Invitation[] = InvitedMock.invitations as Invitation[];
const ITEMS_PER_PAGE = 6; // 페이지당 항목 수 정의

export default function InvitedMenagmentList() {
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(allInvitations.length / ITEMS_PER_PAGE);
  }, []);

  // 현재 페이지에 해당하는 초대 목록 계산
  const currentInvitations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allInvitations.slice(startIndex, endIndex);
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 초대 취소 핸들러
  const handleCancelInvitation = (invitationId: number) => {
    console.log(`초대 ID: ${invitationId} 취소 요청 (실제 API 호출 필요)`);
  };

  return (
    <div className="bg-transparent rounded-xl space-y-4 w-[438px]">
      <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">초대 내역</h2>
        <Button variant="primary" size="xs" className="w-12 h-8 mr-40">
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
        {currentInvitations.map((invitation) => (
          <InvitationListItem
            key={invitation.id}
            invitation={invitation}
            onCancel={handleCancelInvitation}
          />
        ))}
        {currentInvitations.length === 0 && (
          <p className="text-gray-500 py-4 text-center">등록된 구성원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
