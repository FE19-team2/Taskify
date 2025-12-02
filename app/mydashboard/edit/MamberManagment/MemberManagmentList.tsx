'use client';

import React, { useState, useMemo } from 'react';
import MemberListItem, { Member } from './MemberListItem';
import Pagination from './Pagination';
import Mock from '@/mock.json';

const allMembers: Member[] = Mock.members as Member[];
const ITEMS_PER_PAGE = 6; // 페이지당 항목 수 정의

export default function MemberManagementList() {
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(allMembers.length / ITEMS_PER_PAGE);
  }, []);

  // 현재 페이지에 해당하는 멤버 목록 계산
  const currentMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allMembers.slice(startIndex, endIndex);
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 멤버 삭제 핸들러
  const handleDeleteMember = (memberId: number) => {
    console.log(`멤버 ID: ${memberId} 삭제 요청 (실제 API 호출 필요)`);
    // 실제 구현에서는 API 호출 후 상태를 업데이트 필요
  };

  return (
    <div className="bg-transparent rounded-xl space-y-4 w-[740px]">
      <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">구성원</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/*  멤버 목록 */}
      <div>
        {currentMembers.map((member) => (
          <MemberListItem key={member.id} member={member} onDelete={handleDeleteMember} />
        ))}
        {currentMembers.length === 0 && (
          <p className="text-gray-500 py-4 text-center">등록된 구성원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
