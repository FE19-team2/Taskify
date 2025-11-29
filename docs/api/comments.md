# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Comments API (comments.service.ts)

### API 이름 : `createComment(data)`

할 일 카드에 새로운 댓글을 생성합니다.

### data 구조

```js
{
  content: string,
  cardId: number,
  columnId: number,
  dashboardId: number,
}
```

## 요청

| 필드        | 타입   | 필수 | 설명                    |
| ----------- | ------ | ---- | ----------------------- |
| content     | string | true | 댓글 내용               |
| cardId      | number | true | 댓글이 속한 카드 ID     |
| columnId    | number | true | 댓글이 속한 컬럼 ID     |
| dashboardId | number | true | 댓글이 속한 대시보드 ID |

## 응답

### 응답 body 구조

```js
{
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  cardId: number,
  author: {
    profileImageUrl: string | null,
    nickname: string,
    id: number
  }
}
```

| 필드      | 타입              | 필수 | 설명                |
| --------- | ----------------- | ---- | ------------------- |
| id        | number            | true | 댓글 고유 ID        |
| content   | string            | true | 댓글 내용           |
| createdAt | string (ISO 형식) | true | 댓글 생성일         |
| updatedAt | string (ISO 형식) | true | 댓글 수정일         |
| cardId    | number            | true | 댓글이 속한 카드 ID |
| author    | object            | true | 댓글 작성자 정보    |

### author 객체

| 필드            | 타입           | 필수  | 설명                                      |
| --------------- | -------------- | ----- | ----------------------------------------- |
| profileImageUrl | string \| null | false | 작성자 프로필 이미지 URL (없을 경우 null) |
| nickname        | string         | true  | 작성자 닉네임                             |
| id              | number         | true  | 작성자 고유 ID                            |

---

### API 이름 : `getComments(params)`

특정 카드에 달린 댓글 목록을 조회합니다.

### params 구조

```js
{
  size?: number,
  cursorId?: number,
  cardId: number
}
```

### Query Parameters

| 필드     | 타입   | 필수  | 설명                            |
| -------- | ------ | ----- | ------------------------------- |
| size     | number | false | 조회할 댓글 개수 (기본값 10)    |
| cursorId | number | false | 커서 기반 다음 페이지 조회용 ID |
| cardId   | number | true  | 조회할 카드의 고유 ID           |

## 응답

### 응답 body 구조

```js
{
  cursorId: number | null,
  comments: [
    {
      id: number,
      content: string,
      createdAt: string,
      updatedAt: string,
      cardId: number,
      author: {
        profileImageUrl: string | null,
        nickname: string,
        id: number
      }
    }
  ]
}
```

### 최상위 응답 구조

| 필드     | 타입           | 필수  | 설명                                                 |
| -------- | -------------- | ----- | ---------------------------------------------------- |
| cursorId | number \| null | false | 다음 페이지 조회용 커서 ID (다음 페이지 없으면 null) |
| comments | comment[]      | true  | 댓글 목록 배열                                       |

### comment

| 필드      | 타입              | 필수 | 설명                |
| --------- | ----------------- | ---- | ------------------- |
| id        | number            | true | 댓글 고유 ID        |
| content   | string            | true | 댓글 내용           |
| createdAt | string (ISO 형식) | true | 댓글 생성일         |
| updatedAt | string (ISO 형식) | true | 댓글 수정일         |
| cardId    | number            | true | 댓글이 속한 카드 ID |
| author    | object            | true | 댓글 작성자 정보    |

### author

| 필드            | 타입           | 필수  | 설명                                      |
| --------------- | -------------- | ----- | ----------------------------------------- |
| profileImageUrl | string \| null | false | 작성자 프로필 이미지 URL (없을 경우 null) |
| nickname        | string         | true  | 작성자 닉네임                             |
| id              | number         | true  | 작성자 고유 ID                            |

---

### API 이름 : `updateComment(commentId, data)`

특정 댓글의 내용을 수정합니다.

### data 구조

```js
{
  content: string;
}
```

## 요청

### Path Parameter

| 필드      | 타입   | 필수 | 설명                  |
| --------- | ------ | ---- | --------------------- |
| commentId | number | true | 수정할 댓글의 고유 ID |

### Request Body

| 필드    | 타입   | 필수 | 설명         |
| ------- | ------ | ---- | ------------ |
| content | string | true | 새 댓글 내용 |

## 응답

### 응답 body 구조

```js
{
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  cardId: number,
  author: {
    profileImageUrl: string | null,
    nickname: string,
    id: number
  }
}
```

| 필드      | 타입              | 필수 | 설명                |
| --------- | ----------------- | ---- | ------------------- |
| id        | number            | true | 댓글 고유 ID        |
| content   | string            | true | 댓글 내용           |
| createdAt | string (ISO 형식) | true | 댓글 생성일         |
| updatedAt | string (ISO 형식) | true | 댓글 수정일         |
| cardId    | number            | true | 댓글이 속한 카드 ID |
| author    | object            | true | 댓글 작성자 정보    |

#### author 객체

| 필드            | 타입   | 필수 | 설명           |
| --------------- | ------ | ---- | -------------- | ----------------------------------------- |
| profileImageUrl | string | null | false          | 작성자 프로필 이미지 URL (없을 경우 null) |
| nickname        | string | true | 작성자 닉네임  |
| id              | number | true | 작성자 고유 ID |

---

### API 이름 : `deleteComment(commentId)`

특정 댓글을 삭제합니다.

---

## 요청

### Path Parameter

| 필드      | 타입   | 필수 | 설명                  |
| --------- | ------ | ---- | --------------------- |
| commentId | number | true | 삭제할 댓글의 고유 ID |

---

## 응답

HTTP 상태 코드: `204 No Content`  
이 API는 응답 본문(body)이 없습니다.

### 참고

- 성공 시 반환값 없이 204 상태 코드만 내려옵니다.
- 실패 시 `HttpError`가 throw되므로 반드시 `try...catch` 내부에서 사용해야 합니다.
