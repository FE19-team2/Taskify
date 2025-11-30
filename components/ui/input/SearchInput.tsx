// components/ui/SearchInput.tsx

import React, { ReactNode } from 'react';
import { Icon } from '../Icons/Icon';
// import Input from './Input'; // 💡 children으로 받기 때문에 필요 없음

interface SearchInputProps {
  children: ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({ children }) => {
  return (
    <div className="relative mb-6">
      {/* 💡 flex 제거 및 relative만 유지 */} {children}
      {/* 💡 외부에서 전달된 Input 컴포넌트가 먼저 렌더링됨 */}
      {/* 아이콘 영역: Absolute로 Input 위에 겹치게 배치 */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {/* 💡 아이콘 클래스 수정: text-gray-400은 어두운 배경에 적합함 */}
        <Icon className="w-5 h-5 text-gray-400" name="SearchIcon" />
      </div>
    </div>
  );
};

export default SearchInput;
