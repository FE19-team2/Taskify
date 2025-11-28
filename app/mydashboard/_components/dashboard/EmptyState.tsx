import React from 'react';
import Graph from '@/components/ui/Image/Graph';
import Letter from '@/components/ui/Image/Letter';
import Button from '@/components/ui/button/Button';
import { IconMap } from '@/components/ui/Icons/IconMap';

const { CirclePlus } = IconMap;
interface EmptyStateProps {
  type: 'mine' | 'invited';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const isMine = type === 'mine';
  const message = isMine ? '대시보드가 없습니다' : '아직 초대받은 대시보드가 없습니다.';
  const subAction = isMine ? '생성하기' : '대시보드 생성';

  const iconClassName = 'w-20 h-20 text-gray-600';

  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 p-8">
      <div className={`mb-4 ${iconClassName}`}>{isMine ? <Graph /> : <Letter />}</div>
      <p className="text-lg mb-4 text-gray-400">{message}</p>
      {isMine && (
        <Button variant="secondary" size="sm">
          생성하기
          <CirclePlus className="w-[13px] h-[13px]" />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
