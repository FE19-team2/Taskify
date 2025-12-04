import React, { ReactNode } from 'react';
import Graph from '@/components/ui/Image/Graph';
import Letter from '@/components/ui/Image/Letter';
import Button from '@/components/ui/button/Button';
import { Icon } from '@/components/ui/Icons/Icon';
import { cn } from '@/lib/utils/twmerge';

type OnCreateClick = () => void;

interface EmptyStateProps {
  type: 'mine' | 'invited';
  onCreateClick: OnCreateClick;
  children?: ReactNode;
}

const EmptyState = ({ type, onCreateClick, children }: EmptyStateProps) => {
  const isMine = type === 'mine';
  const message = isMine ? '대시보드가 없습니다' : '아직 초대받은 대시보드가 없습니다.';

  const iconClassName = 'w-20 h-20 text-gray-600';
  const baseClasses =
    'bg-black-400 rounded-[30px] border border-gray-500 shadow-2xl p-6 flex flex-col items-center justify-center';
  return (
    <div className={cn(baseClasses, 'h-[272px] w-full')}>
      <div className={`mb-4 ${iconClassName}`}>{isMine ? <Graph /> : <Letter />}</div>
      <p className="text-lg mb-4 text-gray-400 text-center">{message}</p>

      {children}

      {isMine && (
        <Button onClick={onCreateClick} variant="secondary" size="sm">
          생성하기
          <Icon name="CirclePlus" className="w-[13px] h-[13px]" />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
