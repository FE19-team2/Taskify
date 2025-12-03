import React, { ReactNode } from 'react';
import { Icon } from '../Icons/Icon';

interface SearchInputProps {
  children: ReactNode;
  className?: string;
}

const SearchInput = ({ children, className }: SearchInputProps) => {
  return (
    <div className={`relative mb-6 ${className}`}>
      {children}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-gray-400" name="SearchIcon" />
      </div>
    </div>
  );
};

export default SearchInput;
