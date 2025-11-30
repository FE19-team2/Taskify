// components/ui/Pagination.tsx (가정)

import React from 'react';
import { cn } from '@/lib/utils/twmerge';
import { Icon } from '@/components/ui/Icons/Icon'; // 'chevronLeft', 'chevronRight' 아이콘 사용 가정

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // 페이지가 1개 이하일 때는 페이지네이션을 표시하지 않습니다.
  }

  // 표시할 페이지 번호 배열을 계산
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // 끝 페이지가 부족하면 시작 페이지를 조정
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // 버튼 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-400 hover:bg-gray-700 disabled:opacity-50 transition"
      >
        <Icon name="ArrowLeft" className="w-5 h-5" />
      </button>

      {/* 페이지 번호 버튼 목록 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={cn(
            'w-8 h-8 rounded-md font-medium transition duration-150',
            currentPage === page
              ? 'bg-blue-600 text-white' // 현재 페이지 스타일
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700', // 기본 페이지 스타일
          )}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-400 hover:bg-gray-700 disabled:opacity-50 transition"
      >
        <Icon name="ArrowRight" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
