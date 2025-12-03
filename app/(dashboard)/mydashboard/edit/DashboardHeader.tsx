'use client';

import React from 'react';

export default function EditDashboardHeader() {
  return (
    <header
      className="fixed top-0 w-full h-[50px] md:h-16 flex items-center bg-black-400 border-b border-gray-800 z-40 
    md:left-[540px] md:w-[calc(100%-540px)] px-4  justify-between"
    ></header>
  );
}
