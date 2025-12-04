'use Client';

import { getDefaultProfileImage } from '@/lib/utils/get-default-profile-image';
import { formatKoreanDate } from '@/lib/utils/format-date';
import Image from 'next/image';
import { Divider } from '@/components/ui/Divider';

type CardModalInfoProps = {
  dashboardTitle: string;
  columnTitle: string;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  } | null;
  dueDate: string | null;
};

export function CardModalInfo({
  dashboardTitle,
  columnTitle,
  assignee,
  dueDate,
}: CardModalInfoProps) {
  const nickName = assignee?.nickname || '없음';
  const imageUrl = assignee?.profileImageUrl || getDefaultProfileImage(nickName);
  return (
    <div>
      <div className="flex items-center py-3 gap-3 lg:flex-col lg:items-start">
        <h2 className="w-[50px] text-[13px] md:text-[14px] font-semibold">프로젝트</h2>
        <p className="text-[14px]  md:text-[16px]">{`${dashboardTitle} / ${columnTitle}`}</p>
      </div>
      <Divider />
      <div className="flex items-center py-3 gap-3 lg:flex-col lg:items-start">
        <h2 className="w-[50px] text-[13px] md:text-[14px] font-semibold">담당자</h2>
        {assignee ? (
          <div className="flex items-center gap-2">
            <Image
              src={imageUrl}
              alt={nickName}
              width={30}
              height={30}
              className="w-[30px] h-[30px] lg:w-5 lg:h-5 rounded-full"
            />
            <p className="text-[14px] md:text-[16px]">{nickName}</p>
          </div>
        ) : (
          <p className="text-[14px] md:text-[16px]">없음</p>
        )}
      </div>
      <Divider />
      <div className="flex items-center py-3 gap-3 lg:flex-col lg:items-start">
        <h2 className="w-[50px] text-[13px] md:text-[14px] font-semibold">마감일</h2>
        {dueDate ? (
          <p className="text-[14px] md:text-[16px]">{formatKoreanDate(dueDate)}</p>
        ) : (
          <p className="text-[14px] md:text-[16px]">없음</p>
        )}
      </div>
    </div>
  );
}
