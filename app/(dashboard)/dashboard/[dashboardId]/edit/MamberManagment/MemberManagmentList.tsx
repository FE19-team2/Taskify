'use client';

import React, { useState, useMemo, useEffect } from 'react';
import MemberListItem, { Member } from './MemberListItem';
import Pagination from './Pagination';
import { getDashboardMembers } from '@/lib/api/services/members.service';

const ITEMS_PER_PAGE = 6; // 페이지당 항목 수 정의

interface MemberManagementListProps {
  dashboardId: number;
}

export default function MemberManagementList({ dashboardId }: MemberManagementListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // API로 멤버 목록 가져오기
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMembers({
          dashboardId,
          page: currentPage,
          size: ITEMS_PER_PAGE,
        });
        setMembers(data.members);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('멤버 목록을 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
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

  // 멤버 삭제 핸들러
  const handleDeleteMember = async () => {
    // 삭제 후 목록 새로고침을 위해 MemberListItem에서 처리
  };

  // 멤버 삭제 후 목록 새로고침
  const refreshMembers = async () => {
    try {
      const data = await getDashboardMembers({
        dashboardId,
        page: currentPage,
        size: ITEMS_PER_PAGE,
      });
      setMembers(data.members);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('멤버 목록을 새로고침하는데 실패했습니다:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-transparent rounded-xl space-y-4 w-[740px]">
        <div className="w-full flex justify-between items-center pb-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">구성원</h2>
        </div>
        <p className="text-gray-500 py-4 text-center">로딩 중...</p>
      </div>
    );
  }

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
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onDelete={handleDeleteMember}
            onDeleteSuccess={refreshMembers}
          />
        ))}
        {members.length === 0 && (
          <p className="text-gray-500 py-4 text-center">등록된 구성원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
