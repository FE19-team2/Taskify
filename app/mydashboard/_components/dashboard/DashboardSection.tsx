import React from 'react';

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

const DashboardSection = ({ title, children }: DashboardSectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="bg-black-400 rounded-[30px] border border-gray-500 shadow-2xl p-6 min-h-[300px] flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default DashboardSection;
