import { create } from 'zustand';
import { CommentDto } from '@/lib/api/validations/comments';

type Author = {
  nickName: string;
  profileImageUrl: string | null;
};

type CommentStore = {
  author: Author;
  comments: CommentDto[];
  content: string;
  setAuthor: (author: Author) => void;
  setComments: (comments: CommentDto[]) => void;
  setContent: (content: string) => void;
  reset: () => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  author: {
    nickName: '',
    profileImageUrl: null,
  },
  comments: [],
  content: '',
  setAuthor: (author) => set({ author }),
  setComments: (comments) => set({ comments }),
  setContent: (content) => set({ content }),
  reset: () =>
    set({
      author: { nickName: '', profileImageUrl: null },
      comments: [],
      content: '',
    }),
}));
