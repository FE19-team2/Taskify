# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Members API (members.service.ts)

### API 이름 : `getDashboardMembers(params)`

대시보드에 속한 **멤버 목록을 조회**합니다.

---

### Query Parameters

| 필드 | 타입   | 필수  | 설명                                  |
| ---- | ------ | ----- | ------------------------------------- |
| size | number | false | 한 번에 가져올 항목 개수 (기본값: 20) |
| page | number | false | 가져올 페이지 번호 (기본값: 1)        |

---

### Path Parameter

| 필드        | 타입   | 필수 | 설명                      |
| ----------- | ------ | ---- | ------------------------- |
| dashboardId | number | true | 조회할 대시보드의 고유 ID |

---

### 응답 body 구조

```ts
{
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }[];
  totalCount: number;
}
```

| 필드       | 타입     | 필수 | 설명                      |
| ---------- | -------- | ---- | ------------------------- |
| members    | Member[] | true | 대시보드의 멤버 목록 배열 |
| totalCount | number   | true | 전체 멤버 수              |

---

## API 이름 : `deleteDashboardMember(memberId)`

### Path Parameters

| 필드     | 타입   | 필수 | 설명             |
| -------- | ------ | ---- | ---------------- |
| memberId | number | true | 삭제할 멤버의 ID |

## 응답

HTTP 상태 코드: `204 No Content`  
이 API는 응답 본문(body)이 없습니다.

### 참고

- 성공 시 반환값 없이 204 상태 코드만 내려옵니다.
- 실패 시 HttpError가 throw되므로 반드시 try...catch 내부에서 사용해야 합니다.
