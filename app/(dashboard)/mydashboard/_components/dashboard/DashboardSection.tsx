import { cn } from '@/lib/utils/twmerge';
import React from 'react';

interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardSection = ({ title, children }: DashboardSectionProps) => {
  return (
    <section className="pt-24 px-10 mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
};

export const InvitedDashboardSection = ({ title, children }: DashboardSectionProps) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0]; // SearchInput
  const remainingChildren = childrenArray.slice(1);

  return (
    <section className={cn('pt-24 px-5 lg:px-10 mb-8')}>
      <div className="flex flex-col md:flex-col md:w-full lg:flex-row lg:items-center ">
        <h2 className="text-xl font-extrabold text-white whitespace-nowrap mb-4 lg:mb-0">
          {title}
        </h2>
        {firstChild && <div className="w-full lg:ml-[900px]">{firstChild}</div>}
      </div>
      <div>{remainingChildren}</div>
    </section>
  );
};
