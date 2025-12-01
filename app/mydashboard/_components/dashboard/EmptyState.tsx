import React, { ReactNode } from 'react';
import Graph from '@/components/ui/Image/Graph';
import Letter from '@/components/ui/Image/Letter';
import Button from '@/components/ui/button/Button';
import { Icon } from '@/components/ui/Icons/Icon';

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

  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 p-8">
      <div className={`mb-4 ${iconClassName}`}>{isMine ? <Graph /> : <Letter />}</div>
      <p className="text-lg mb-4 text-gray-400">{message}</p>

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
