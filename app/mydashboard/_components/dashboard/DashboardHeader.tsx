import React from 'react';

const DashboardHeader = () => {
  return (
    <header className=" top-0 left-[340px] w-full h-16 flex justify-end items-center bg-black-400 border-b border-gray-800 px-8 z-40">
      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-white transition">관리</button>

        <button className="text-gray-400 hover:text-white transition">공유</button>
      </div>
    </header>
  );
};

export default DashboardHeader;
