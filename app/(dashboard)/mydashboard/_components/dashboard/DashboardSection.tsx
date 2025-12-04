import React from 'react';

interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardSection = ({ title, children }: DashboardSectionProps) => {
  return (
    <section className="mb-8 md:mb-12 px-4 md:px-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
};

export const InvitedDashboardSection = ({ title, children }: DashboardSectionProps) => {
  const childrenArray = React.Children.toArray(children);
  const searchInput = childrenArray.find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      typeof child.type === 'function' &&
      child.type.name === 'SearchInput',
  );
  const otherChildren = childrenArray.filter(
    (child) =>
      !(
        React.isValidElement(child) &&
        typeof child.type === 'function' &&
        child.type.name === 'SearchInput'
      ),
  );

  return (
    <section className="mb-8 px-4 md:px-10">
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-4">
        <h2 className="text-xl font-extrabold text-white mb-3 lg:mb-0">{title}</h2>
        {searchInput && <div className="w-full lg:w-auto lg:min-w-[300px]">{searchInput}</div>}
      </div>

      <div>{otherChildren}</div>
    </section>
  );
};
