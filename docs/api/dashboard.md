# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Dashboard API (dashboards.service.ts)

### API 이름 : `createDashboard(data)`

새 대시보드를 생성합니다.

---

### data 구조

```ts
{
  title: string;
  color: string; // Hex 코드 형식
}
```

## 요청

| 필드  | 타입   | 필수 | 설명                          |
| ----- | ------ | ---- | ----------------------------- |
| title | string | true | 대시보드 제목                 |
| color | string | true | 대시보드 색상 (Hex 코드 형식) |

## 응답

### 응답 body 구조

```js
{
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}
```

| 필드        | 타입              | 필수 | 설명                                   |
| ----------- | ----------------- | ---- | -------------------------------------- |
| id          | number            | true | 대시보드 고유 ID                       |
| title       | string            | true | 대시보드 제목                          |
| color       | string            | true | 대시보드 색상 (Hex 코드 형식)          |
| createdAt   | string (ISO 형식) | true | 대시보드 생성일                        |
| updatedAt   | string (ISO 형식) | true | 마지막 수정일                          |
| createdByMe | boolean           | true | 현재 사용자가 생성한 대시보드인지 여부 |
| userId      | number            | true | 대시보드를 생성한 사용자 ID            |

---

### API 이름 : `getDashboards(params)`

대시보드 목록을 페이지네이션 형태로 조회합니다.

---

### query 구조

```ts
{
  cursorId: number | null;
  size: number;
}
```

## 요청

| 필드     | 타입           | 필수  | 설명                                                 |
| -------- | -------------- | ----- | ---------------------------------------------------- |
| cursorId | number \| null | false | 다음 페이지 조회를 위한 커서 ID (null이면 첫 페이지) |
| size     | number         | false | 불러올 개수 (기본값 10)                              |

## 응답

### 응답 body 구조

```js
{
  cursorId: number | null;
  totalCount: number;
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }[];
}
```

### 최상위 응답 필드

| 필드       | 타입           | 필수  | 설명                                |
| ---------- | -------------- | ----- | ----------------------------------- |
| cursorId   | number \| null | false | 다음 페이지 커서 (null이면 더 없음) |
| totalCount | number         | true  | 전체 대시보드 개수                  |
| dashboards | Dashboard[]    | true  | 대시보드 배열                       |

### Dashboard 객체

| 필드        | 타입              | 필수 | 설명                                   |
| ----------- | ----------------- | ---- | -------------------------------------- |
| id          | number            | true | 대시보드 고유 ID                       |
| title       | string            | true | 대시보드 제목                          |
| color       | string            | true | 대시보드 색상 (Hex 코드)               |
| createdAt   | string (ISO 형식) | true | 생성일                                 |
| updatedAt   | string (ISO 형식) | true | 수정일                                 |
| createdByMe | boolean           | true | 현재 사용자가 생성한 대시보드인지 여부 |
| userId      | number            | true | 대시보드를 생성한 사용자 ID            |

---

### API 이름 : `getDashboardById(dashboardId)`

특정 대시보드를 조회합니다.

---

### Path Parameter

| 필드        | 타입   | 필수 | 설명                      |
| ----------- | ------ | ---- | ------------------------- |
| dashboardId | number | true | 조회할 대시보드의 고유 ID |

---

### 응답

#### 응답 body 구조

```ts
{
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}
```

| 필드        | 타입              | 필수 | 설명                                   |
| ----------- | ----------------- | ---- | -------------------------------------- |
| id          | number            | true | 대시보드 고유 ID                       |
| title       | string            | true | 대시보드 제목                          |
| color       | string            | true | 대시보드 색상 (Hex 코드)               |
| createdAt   | string (ISO 형식) | true | 대시보드 생성일                        |
| updatedAt   | string (ISO 형식) | true | 마지막 수정일                          |
| createdByMe | boolean           | true | 현재 사용자가 생성한 대시보드인지 여부 |
| userId      | number            | true | 대시보드를 생성한 사용자 ID            |

---

### API 이름 : `updateDashboard(dashboardId, data)`

기존 대시보드 정보를 수정합니다.

---

### Path Parameter

| 필드        | 타입   | 필수 | 설명                      |
| ----------- | ------ | ---- | ------------------------- |
| dashboardId | number | true | 수정할 대시보드의 고유 ID |

---

### data 구조

```ts
{
  title: string;
  color: string;
}
```

## 요청

| 필드  | 타입   | 필수 | 설명                          |
| ----- | ------ | ---- | ----------------------------- |
| title | string | true | 대시보드 제목                 |
| color | string | true | 대시보드 색상 (Hex 코드 형식) |

## 응답

### 응답 body 구조

```ts
{
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}
```

| 필드        | 타입              | 필수 | 설명                                   |
| ----------- | ----------------- | ---- | -------------------------------------- |
| id          | number            | true | 대시보드 고유 ID                       |
| title       | string            | true | 대시보드 제목                          |
| color       | string            | true | 대시보드 색상 (Hex 코드 형식)          |
| createdAt   | string (ISO 형식) | true | 대시보드 생성일                        |
| updatedAt   | string (ISO 형식) | true | 마지막 수정일                          |
| createdByMe | boolean           | true | 현재 사용자가 생성한 대시보드인지 여부 |
| userId      | number            | true | 대시보드를 생성한 사용자 ID            |

---

### API 이름 : `deleteDashboard(dashboardId)`

특정 대시보드를 삭제합니다.

---

### Path Parameter

| 필드        | 타입   | 필수 | 설명                      |
| ----------- | ------ | ---- | ------------------------- |
| dashboardId | number | true | 삭제할 대시보드의 고유 ID |

---

### 응답

HTTP 상태 코드: **204 No Content**  
이 API는 응답 본문(body)을 반환하지 않습니다.

### 참고

- 성공 시 204 상태만 내려옵니다.
- 실패 시 HttpError가 throw되므로 반드시 `try...catch`로 처리해야 합니다.

---

### API 이름 : `sendDashboardInvitation(dashboardId, data)`

대시보드에 다른 사용자를 초대합니다.

---

### Path Parameter

| 필드        | 타입   | 필수 | 설명                           |
| ----------- | ------ | ---- | ------------------------------ |
| dashboardId | number | true | 초대할 대상 대시보드의 고유 ID |

---

### data 구조

```ts
{
  email: string;
}
```

## 요청

| 필드  | 타입   | 필수 | 설명                   |
| ----- | ------ | ---- | ---------------------- |
| email | string | true | 초대할 사용자의 이메일 |

## 응답

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

#### inviter / invitee 객체 구조

| 필드     | 타입   | 필수 | 설명           |
| -------- | ------ | ---- | -------------- |
| nickname | string | true | 사용자 닉네임  |
| email    | string | true | 사용자 이메일  |
| id       | number | true | 사용자 고유 ID |

#### dashboard 객체 구조

| 필드  | 타입   | 필수 | 설명          |
| ----- | ------ | ---- | ------------- |
| title | string | true | 대시보드 제목 |
| id    | number | true | 대시보드 ID   |

---

### API 이름 : `getDashboardInvitations(dashboardId, params)`

특정 대시보드에 발송된 초대 목록을 페이지네이션으로 조회합니다.

---

## Path Parameter

| 필드        | 타입   | 필수 | 설명                                  |
| ----------- | ------ | ---- | ------------------------------------- |
| dashboardId | number | true | 초대 목록을 조회할 대시보드의 고유 ID |

### params 구조

```ts
{
  page: number;
  size: number;
}
```

## 요청

| 필드 | 타입   | 필수  | 설명                                 |
| ---- | ------ | ----- | ------------------------------------ |
| page | number | false | 조회할 페이지 번호 (기본값 1)        |
| size | number | false | 한 번에 조회할 초대 개수 (기본값 10) |

## 응답

### 응답 body 구조

```ts
{
  totalCount: number;
  invitations: {
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
  [];
}
```

### 최상위 응답 필드

| 필드        | 타입         | 필수 | 설명           |
| ----------- | ------------ | ---- | -------------- |
| totalCount  | number       | true | 전체 초대 개수 |
| invitations | Invitation[] | true | 초대 정보 배열 |

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

### API 이름 : `revokeDashboardInvitation(dashboardId, invitationId)`

대시보드에 보낸 초대를 취소(철회)합니다.

---

### Path Parameters

| 필드         | 타입   | 필수 | 설명                             |
| ------------ | ------ | ---- | -------------------------------- |
| dashboardId  | number | true | 초대를 취소할 대시보드의 고유 ID |
| invitationId | number | true | 취소할 초대의 고유 ID            |

---

### 요청

이 API는 **요청 body가 없습니다.**

---

### 응답

**HTTP 상태 코드:** `204 No Content`  
응답 body 없음.

---

### 참고

- 초대가 이미 수락되었거나 존재하지 않는 경우 서버에서 오류가 발생할 수 있습니다.
- 반드시 `try...catch` 내부에서 사용해야 합니다.
