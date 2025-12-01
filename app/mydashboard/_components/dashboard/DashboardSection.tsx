import React from 'react';

interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardSection = ({ title, children }: DashboardSectionProps) => {
  return (
    <section className="mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
};

export const InvitedDashboardSection = ({ title, children }: DashboardSectionProps) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const remainingChildren = childrenArray.slice(1);
  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row  lg:justify-between items-start mb-4">
        <h2 className="text-xl font-extrabold text-white mb-3 lg:mb-0">{title}</h2>
        <div className="w-full md:w-full lg:w-auto lg:max-w-xs">{firstChild}</div>
      </div>

      <div>{remainingChildren}</div>
    </section>
  );
};
