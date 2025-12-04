'use client';

import { useEffect } from 'react';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { getComments } from '@/lib/api/services/comments.service';
import { getUserProfile } from '@/lib/api/services/users.service';
import { useCommentStore } from './UseCommentStore';
import { HttpError } from '@/lib/api/request-core';

export function CardModalComment({ cardId }: { cardId: number }) {
  const { setComments, setAuthor } = useCommentStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserProfile();
        setAuthor({
          nickName: user.nickname,
          profileImageUrl: user.profileImageUrl,
        });

        const response = await getComments({ cardId, size: 10, cursorId: undefined });
        setComments(response.comments);
      } catch (error) {
        if (error instanceof HttpError) {
          console.error('Failed to fetch data:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };

    fetchData();
  }, [cardId, setComments, setAuthor]);

  return (
    <div className="flex flex-col gap-6">
      <CommentInput />
      <CommentList />
    </div>
  );
}
