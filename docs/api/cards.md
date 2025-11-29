# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Cards API (cards.service.ts)

### API 이름 : `createCard(data)`

컬럼에 새 할 일 카드를 생성합니다.

### data 구조

```js
{
  assigneeUserId: number | null,
  dashboardId: number,
  columnId: number,
  title: string,
  description: string,
  dueDate: string | null,
  tags: string[],
  imageUrl: string | null
}
```

### 요청

| 필드           | 타입                      | 필수  | 설명                              |
| -------------- | ------------------------- | ----- | --------------------------------- |
| assigneeUserId | number \| null            | false | 담당자 고유 ID                    |
| dashboardId    | number                    | true  | 대시보드 고유 ID                  |
| columnId       | number                    | true  | 컬럼 고유 ID                      |
| title          | string                    | true  | 할 일 카드 제목                   |
| description    | string                    | true  | 할 일 카드 설명                   |
| dueDate        | string (ISO 형식) \| null | false | 마감일 (예: 2025-11-28T00:00:00Z) |
| tags           | string[]                  | true  | 할 일 카드 태그 배열              |
| imageUrl       | string \| null            | false | 할 일 카드 이미지                 |

### 응답

#### 응답 body 구조

```js
{
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  } | null;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

```

| 필드        | 타입                      | 필수  | 설명                                     |
| ----------- | ------------------------- | ----- | ---------------------------------------- |
| id          | number                    | true  | 할 일 카드 고유 ID                       |
| title       | string                    | true  | 할 일 카드 제목                          |
| description | string                    | true  | 할 일 카드 설명                          |
| tags        | string[]                  | true  | 할 일 카드 태그 배열                     |
| dueDate     | string (ISO 형식) \| null | false | 마감일 (예: 2025-11-28T00:00:00Z)        |
| assignee    | object \| null            | false | 담당자 정보 객체 (아래 표 참고)          |
| imageUrl    | string \| null            | false | 할 일 카드 이미지                        |
| teamId      | string                    | true  | 팀 ID                                    |
| columnId    | number                    | true  | 컬럼 고유 ID                             |
| createdAt   | string (ISO 형식)         | true  | 카드 생성일 (예: 2025-11-28T00:00:00Z)   |
| updatedAt   | string (ISO 형식)         | true  | 마지막 수정일 (예: 2025-11-28T00:00:00Z) |

### 참고

#### assignee 객체 상세 타입 테이블

| 필드            | 타입   | 필수  | 설명                   |
| --------------- | ------ | ----- | ---------------------- |
| profileImageUrl | string | false | 담당자 프로필 사진 URL |
| nickname        | string | true  | 담당자 닉네임          |
| id              | number | true  | 담당자 ID              |

### API 이름 : `getCards(params)`

특정 팀의 특정 컬럼에 있는 카드 목록을 커서 기반 페이지네이션으로 조회합니다.

### params 구조

```js
{
  columnId: number;
  size?: number;
  cursorId?: number | null;
}
```

## 요청

### Query Parameters

| 필드     | 타입   | 필수  | 설명                                 |
| -------- | ------ | ----- | ------------------------------------ |
| columnId | number | true  | 조회할 컬럼 ID                       |
| size     | number | false | 조회 개수 (기본값: 10)               |
| cursorId | number | false | 다음 페이지 조회 시 사용하는 커서 ID |

---

## 응답

### 응답 body 구조

```js
{
  cursorId: number | null,
  totalCount: number,
  cards: [
    {
      id: number,
      title: string,
      description: string,
      tags: string[],
      dueDate: string | null,
      assignee: {
        profileImageUrl: string | null,
        nickname: string,
        id: number
      } | null,
      imageUrl: string | null,
      teamId: string,
      columnId: number,
      createdAt: string,
      updatedAt: string
    }
  ]
}
```

#### 최상위 응답 필드

| 필드       | 타입           | 필수  | 설명                      |
| ---------- | -------------- | ----- | ------------------------- |
| cursorId   | number \| null | false | null이면 다음 페이지 없음 |
| totalCount | number         | true  | 전체 카드 개수            |
| cards      | Card[]         | true  | 카드 배열                 |

---

#### Card 객체 타입

| 필드        | 타입                      | 필수  | 설명                  |
| ----------- | ------------------------- | ----- | --------------------- |
| id          | number                    | true  | 카드 고유 ID          |
| title       | string                    | true  | 카드 제목             |
| description | string                    | true  | 카드 설명             |
| tags        | string[]                  | true  | 태그 배열             |
| dueDate     | string (ISO 형식) \| null | false | 마감일                |
| assignee    | object \| null            | false | 담당자 객체 또는 null |
| imageUrl    | string \| null            | false | 카드 이미지 URL       |
| teamId      | number                    | true  | 팀 ID                 |
| columnId    | number                    | true  | 컬럼 ID               |
| createdAt   | string (ISO 형식)         | true  | 카드 생성일           |
| updatedAt   | string (ISO 형식)         | true  | 마지막 수정일         |

---

#### assignee 객체 상세 타입

| 필드            | 타입           | 필수  | 설명                   |
| --------------- | -------------- | ----- | ---------------------- |
| profileImageUrl | string \| null | false | 담당자 프로필 사진 URL |
| nickname        | string         | true  | 담당자 닉네임          |
| id              | number         | true  | 담당자 ID              |

---

### API 이름 : `updateCard(data)`

기존 할 일 카드 정보를 수정합니다.

#### data 구조

```js
{
  columnId: number,
  assigneeUserId: number | null,
  title: string,
  description: string,
  dueDate: string | null,
  tags: string[],
  imageUrl: string | null
}
```

### 요청

| 필드           | 타입                      | 필수  | 설명                              |
| -------------- | ------------------------- | ----- | --------------------------------- |
| columnId       | number                    | true  | 컬럼 고유 ID                      |
| assigneeUserId | number \| null            | false | 담당자 고유 ID (없을 경우 null)   |
| title          | string                    | true  | 할 일 카드 제목                   |
| description    | string                    | true  | 할 일 카드 설명                   |
| dueDate        | string (ISO 형식) \| null | false | 마감일 (예: 2025-11-28T00:00:00Z) |
| tags           | string[]                  | true  | 할 일 카드 태그 배열              |
| imageUrl       | string \| null            | false | 할 일 카드 이미지                 |

### 응답

#### 응답 body 구조

```js
{
  id: number,
  title: string,
  description: string,
  tags: string[],
  dueDate: string | null,
  assignee: {
    profileImageUrl: string | null,
    nickname: string,
    id: number
  } | null,
  imageUrl: string | null,
  teamId: string,
  columnId: number,
  createdAt: string,
  updatedAt: string
}
```

| 필드        | 타입                      | 필수  | 설명                                     |
| ----------- | ------------------------- | ----- | ---------------------------------------- |
| id          | number                    | true  | 할 일 카드 고유 ID                       |
| title       | string                    | true  | 할 일 카드 제목                          |
| description | string                    | true  | 할 일 카드 설명                          |
| tags        | string[]                  | true  | 할 일 카드 태그 배열                     |
| dueDate     | string (ISO 형식) \| null | false | 마감일 (예: 2025-11-28T00:00:00Z)        |
| assignee    | object \| null            | false | 담당자 정보 객체 (아래 표 참고)          |
| imageUrl    | string \| null            | false | 할 일 카드 이미지                        |
| teamId      | string                    | true  | 팀 ID                                    |
| columnId    | number                    | true  | 컬럼 고유 ID                             |
| createdAt   | string (ISO 형식)         | true  | 카드 생성일 (예: 2025-11-28T00:00:00Z)   |
| updatedAt   | string (ISO 형식)         | true  | 마지막 수정일 (예: 2025-11-28T00:00:00Z) |

#### assignee 객체 상세 타입 테이블

| 필드            | 타입           | 필수  | 설명                   |
| --------------- | -------------- | ----- | ---------------------- |
| profileImageUrl | string \| null | false | 담당자 프로필 사진 URL |
| nickname        | string         | true  | 담당자 닉네임          |
| id              | number         | true  | 담당자 ID              |

---

### API 이름 : `getCardById(cardId)`

특정 카드의 상세 정보를 조회합니다. (코멘트 포함)

### 요청

#### Path Parameter

| 필드   | 타입   | 필수 | 설명                  |
| ------ | ------ | ---- | --------------------- |
| cardId | number | true | 조회할 카드의 고유 ID |

---

### 응답

#### 응답 body 구조

```js
{
  card: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string | null;
    assignee: {
      profileImageUrl: string | null;
      nickname: string;
      id: number;
    } | null;
    imageUrl: string | null;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  };
  comments: {
    cursorId: number | null;
    comments: {
      id: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      cardId: number;
      author: {
        profileImageUrl: string | null;
        nickname: string;
        id: number;
      };
    }[];
  };
}
```

### 최상위 응답 구조

| 필드     | 타입   | 필수 | 설명                               |
| -------- | ------ | ---- | ---------------------------------- |
| card     | object | true | 카드 상세 정보 객체 (아래 표 참고) |
| comments | object | true | 댓글 목록 응답 객체 (아래 표 참고) |

---

## card 객체 구조

| 필드        | 타입                      | 필수  | 설명                              |
| ----------- | ------------------------- | ----- | --------------------------------- |
| id          | number                    | true  | 할 일 카드 고유 ID                |
| title       | string                    | true  | 할 일 카드 제목                   |
| description | string                    | true  | 할 일 카드 설명                   |
| tags        | string[]                  | true  | 할 일 카드 태그 배열              |
| dueDate     | string (ISO 형식) \| null | false | 마감일 (예: 2025-11-28T00:00:00Z) |
| assignee    | object \| null            | false | 담당자 정보 객체 (아래 표 참고)   |
| imageUrl    | string \| null            | false | 할 일 카드 이미지                 |
| teamId      | string                    | true  | 팀 ID                             |
| columnId    | number                    | true  | 컬럼 ID                           |
| createdAt   | string (ISO 형식)         | true  | 카드 생성일                       |
| updatedAt   | string (ISO 형식)         | true  | 마지막 수정일                     |

### assignee 객체

| 필드            | 타입           | 필수  | 설명                   |
| --------------- | -------------- | ----- | ---------------------- |
| profileImageUrl | string \| null | false | 담당자 프로필 사진 URL |
| nickname        | string         | true  | 담당자 닉네임          |
| id              | number         | true  | 담당자 ID              |

---

## comments 객체 구조

| 필드     | 타입           | 필수  | 설명                            |
| -------- | -------------- | ----- | ------------------------------- |
| cursorId | number \| null | false | 다음 페이지 조회를 위한 커서 ID |
| comments | Comment[]      | true  | 댓글 배열                       |

---

## Comment 객체(CommentServiceDto)

| 필드      | 타입              | 필수 | 설명                     |
| --------- | ----------------- | ---- | ------------------------ |
| id        | number            | true | 댓글 고유 ID             |
| content   | string            | true | 댓글 내용                |
| createdAt | string (ISO 형식) | true | 댓글 생성일              |
| updatedAt | string (ISO 형식) | true | 댓글 수정일              |
| cardId    | number            | true | 해당 댓글이 속한 카드 ID |
| author    | object            | true | 댓글 작성자 정보 객체    |

### author 객체

| 필드            | 타입           | 필수  | 설명              |
| --------------- | -------------- | ----- | ----------------- |
| profileImageUrl | string \| null | false | 작성자 프로필 URL |
| nickname        | string         | true  | 작성자 닉네임     |
| id              | number         | true  | 작성자 ID         |

---

### API 이름 : `deleteCard(cardId)`

특정 카드를 삭제합니다.

---

### 요청

#### Path Parameters

| 필드   | 타입   | 필수 | 설명                  |
| ------ | ------ | ---- | --------------------- |
| cardId | number | true | 삭제할 카드의 고유 ID |

---

### 응답

HTTP 상태 코드: `204 No Content`  
이 API는 응답 본문(body)이 없습니다.

### 참고

- 성공 시 반환값 없이 204 상태 코드만 내려옵니다.
- 실패 시 HttpError가 throw되므로 반드시 try...catch 내부에서 사용해야 합니다.
