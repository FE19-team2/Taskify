import type { CommentDto } from '@/lib/api/validations/comments';
import { getDefaultProfileImage } from '@/lib/utils/get-default-profile-image';
import { formatKoreanDateTime } from '@/lib/utils/format-date';
import Image from 'next/image';

export function Comment({ data }: { data: CommentDto }) {
  const author = data.author;
  const profileImageUrl = author.profileImageUrl || getDefaultProfileImage(author.nickname);

  return (
    <div className="flex items-start gap-3">
      <Image
        src={profileImageUrl}
        alt={`${author.nickname}의 프로필 이미지`}
        width={30}
        height={30}
        className="rounded-full mt-1"
      />
      <div>
        <div>
          <span className="font-semibold mr-1">{author.nickname}</span>
          <span className="text-sm text-gray-500">{formatKoreanDateTime(data.createdAt)}</span>
        </div>
        <div className="whitespace-pre-wrap mt-[5.5px]">{data.content}</div>
      </div>
    </div>
  );
}
