# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Invitations API (invitations.service.ts)

### API 이름 : `getInvitations(params)`

사용자가 받은 초대 목록을 조회합니다.  
커서 기반 페이지네이션을 사용합니다.

---

### Query Parameters

| 필드     | 타입           | 필수  | 설명                                    |
| -------- | -------------- | ----- | --------------------------------------- |
| size     | number         | false | 한 번에 가져올 초대 개수 (default: 10)  |
| cursorId | number \| null | false | 이전 응답의 cursorId (없으면 첫 페이지) |
| title    | string         | false | 제목 검색 필터                          |

---

### 응답 Body 구조

```ts
{
  cursorId: number | null;
  invitations: Invitation[];
}

type Invitation = {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
};
```

### 최상위 응답 필드

| 필드        | 타입         | 필수 | 설명           |
| ----------- | ------------ | ---- | -------------- | ------------------------------------------------- |
| cursorId    | number       | null | false          | 다음 페이지로 이어지는 커서 ID (null이면 더 없음) |
| invitations | Invitation[] | true | 초대 목록 배열 |

#### Invitation 객체

| 필드           | 타입              | 필수  | 설명                                   |
| -------------- | ----------------- | ----- | -------------------------------------- |
| id             | number            | true  | 초대 고유 ID                           |
| inviter        | object            | true  | 초대한 사용자 정보 객체                |
| teamId         | string            | true  | 초대가 속한 팀 ID                      |
| dashboard      | object            | true  | 초대한 대시보드 정보 객체              |
| invitee        | object            | true  | 초대받은 사용자 정보 객체              |
| inviteAccepted | boolean \| null   | false | 초대 수락 여부 (아직 응답 전이면 null) |
| createdAt      | string (ISO 형식) | true  | 초대 생성일                            |
| updatedAt      | string (ISO 형식) | true  | 마지막 수정일                          |

#### Inviter /invitee 객체

| 필드     | 타입   | 필수 | 설명           |
| -------- | ------ | ---- | -------------- |
| nickname | string | true | 사용자 닉네임  |
| email    | string | true | 사용자 이메일  |
| id       | number | true | 사용자 고유 ID |

#### dashboard 객체

| 필드  | 타입   | 필수 | 설명          |
| ----- | ------ | ---- | ------------- |
| title | string | true | 대시보드 제목 |
| id    | number | true | 대시보드 ID   |

---

### API 이름 : `acceptInvitation(invitationId)` or `declineInvitation(invitationId)`

사용자가 받은 초대를 수락 혹은 거절합니다.

```js
// 수락 시 사용
acceptInvitation(invitationId);
// 거절 시 사용
declineInvitation(invitationId);
```

---

### Path Parameter

| 필드         | 타입   | 필수 | 설명                  |
| ------------ | ------ | ---- | --------------------- |
| invitationId | number | true | 수락할 초대의 고유 ID |

---

### 요청

이 API는 **요청 body가 없습니다.**  
내부적으로 `inviteAccepted = true || false` 로 호출됩니다.

---

### 응답 body 구조

```ts
{
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  }
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  }
  invitee: {
    nickname: string;
    email: string;
    id: number;
  }
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}
```

| 필드           | 타입              | 필수 | 설명                      |
| -------------- | ----------------- | ---- | ------------------------- | -------------------------------- |
| id             | number            | true | 초대 고유 ID              |
| inviter        | object            | true | 초대한 사용자 정보 객체   |
| teamId         | string            | true | 초대가 속한 팀 ID         |
| dashboard      | object            | true | 초대한 대시보드 정보 객체 |
| invitee        | object            | true | 초대받은 사용자 정보 객체 |
| inviteAccepted | boolean           | null | true                      | 초대 수락 여부 (`true`로 변경됨) |
| createdAt      | string (ISO 형식) | true | 초대 생성일               |
| updatedAt      | string (ISO 형식) | true | 마지막 수정일             |

#### Inviter /invitee 객체

| 필드     | 타입   | 필수 | 설명           |
| -------- | ------ | ---- | -------------- |
| nickname | string | true | 사용자 닉네임  |
| email    | string | true | 사용자 이메일  |
| id       | number | true | 사용자 고유 ID |

#### dashboard 객체

| 필드  | 타입   | 필수 | 설명          |
| ----- | ------ | ---- | ------------- |
| title | string | true | 대시보드 제목 |
| id    | number | true | 대시보드 ID   |
