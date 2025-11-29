# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Auth API (auth.service.ts)

### API 이름 : `login(data)`

사용자의 이메일과 비밀번호를 통해 로그인합니다.

### data 구조

```js
{
  email: string;
  password: string;
}
```

### 요청

| 필드     | 타입   | 필수 | 설명            |
| -------- | ------ | ---- | --------------- |
| email    | string | true | 사용자 이메일   |
| password | string | true | 사용자 비밀번호 |

### 응답

#### 응답 body 구조

```js
{
  id: number,
  email: string,
  nickname: string,
  profileImageUrl: string | null,
  createdAt: string,
  updatedAt: string,
}
```

| 필드            | 타입              | 필수  | 설명                                     |
| --------------- | ----------------- | ----- | ---------------------------------------- |
| id              | number            | true  | 사용자 고유 ID                           |
| email           | string            | true  | 사용자 이메일                            |
| nickname        | string            | true  | 사용자 닉네임                            |
| profileImageUrl | string \| null    | false | 프로필 이미지 URL                        |
| createdAt       | string (ISO 형식) | true  | 계정 생성일 (예: 2025-11-28T00:00:00Z)   |
| updatedAt       | string (ISO 형식) | true  | 마지막 수정일 (예: 2025-11-28T00:00:00Z) |

### 참고

날짜 필드는 ISO 8601 형식을 따릅니다.  
`ex: 2025-11-28T13:45:00Z => 한국 시간 기준 2025.11.28 22:45`

---

### API 이름 : `passwordChange(data)`

사용자의 비밀번호를 변경합니다.

### data 구조

```js
{
  password: string;
  newPassword: string;
}
```

### 요청

| 필드        | 타입   | 필수 | 설명               |
| ----------- | ------ | ---- | ------------------ |
| password    | string | true | 사용자 현 비밀번호 |
| newPassword | string | true | 사용자 새 비밀번호 |

### 응답

**HTTP 상태 코드:** `204 No Content`  
이 API는 응답 본문(`body`)이 없습니다.

### 참고

- 실제 API 호출 시 **반환값이 없습니다.**
- 실패 시 `HttpError`를 throw하므로, 반드시 `try...catch` 문 내부에서 사용해주세요.
