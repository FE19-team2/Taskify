import { CardDto } from '@/lib/api/validations/cards';

type ColumnMockData = {
  id: number;
  title: string;
  cards: CardDto[];
};

export const mockColumns: ColumnMockData[] = [
  {
    id: 1,
    title: 'To-do',
    cards: [
      {
        id: 1,
        title: '기능 설정',
        description: '프로젝트 기본 설정',
        tags: ['프로젝트', '설정'],
        dueDate: '2025-07-12T00:00:00.000Z',
        assignee: {
          id: 1,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 1,
        createdAt: '2025-07-01T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
      },
      {
        id: 2,
        title: '레퍼런스 찾기',
        description: 'UI/UX 레퍼런스 수집',
        tags: ['프로젝트', '디자인', '설정'],
        dueDate: '2025-07-18T00:00:00.000Z',
        assignee: {
          id: 2,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 1,
        createdAt: '2025-07-01T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
      },
      {
        id: 3,
        title: 'GUI 디자인',
        description: '사용자 인터페이스 디자인',
        tags: ['프로젝트', '디자인', '설정'],
        dueDate: '2025-07-20T00:00:00.000Z',
        assignee: {
          id: 3,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 1,
        createdAt: '2025-07-01T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 2,
    title: 'On Progress',
    cards: [
      {
        id: 4,
        title: '와이어프레임 만들기',
        description: '프로젝트 와이어프레임 작성',
        tags: ['프로젝트', '디자인', '설정'],
        dueDate: '2025-07-17T00:00:00.000Z',
        assignee: {
          id: 4,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 2,
        createdAt: '2025-07-01T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      {
        id: 5,
        title: '프로젝트 기획',
        description: '프로젝트 기획서 작성',
        tags: ['프로젝트'],
        dueDate: '2025-07-01T00:00:00.000Z',
        assignee: {
          id: 5,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 3,
        createdAt: '2025-06-25T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
      },
      {
        id: 6,
        title: '프로젝트 주제 정하기',
        description: '팀원들과 주제 논의',
        tags: ['프로젝트'],
        dueDate: '2025-06-30T00:00:00.000Z',
        assignee: {
          id: 6,
          nickname: '박민영',
          profileImageUrl: null,
        },
        imageUrl: null,
        teamId: '1',
        columnId: 3,
        createdAt: '2025-06-20T00:00:00.000Z',
        updatedAt: '2025-06-30T00:00:00.000Z',
      },
    ],
  },
];
