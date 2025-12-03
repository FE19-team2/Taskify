'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 이전 페이지로 이동
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  //  버튼 스타일
  const buttonClass = (disabled: boolean) =>
    `w-8 h-8 flex items-center justify-center  text-white transition duration-150 
     ${disabled ? ' text-gray-500 cursor-not-allowed' : ' hover:bg-gray-600 cursor-pointer'}`;

  return (
    <div className="flex items-center space-x-2">
      {/*  이전 페이지 버튼 */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={buttonClass(currentPage === 1)}
      >
        {/* ArrowLeft 아이콘으로 대체 예정 */}
        &lt;
      </button>

      {/*  현재 페이지 정보 */}
      <span className="text-sm font-semibold text-white px-2">
        {currentPage} of {totalPages}
      </span>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={buttonClass(currentPage === totalPages)}
      >
        {/* ArrowRight 아이콘으로 대체 예정 */}
        &gt;
      </button>
    </div>
  );
}
