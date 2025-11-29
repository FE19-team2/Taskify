# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## Columns API (columns.service.ts)

### API 이름 : `createColumn(data)`

대시보드에 새로운 컬럼을 생성합니다.

### data 구조

```js
{
  title: string,
  dashboardId: number;
}
```

## 요청

### Request Body

| 필드        | 타입   | 필수 | 설명                    |
| ----------- | ------ | ---- | ----------------------- |
| title       | string | true | 컬럼 제목               |
| dashboardId | number | true | 컬럼이 속할 대시보드 ID |

---

## 응답

### 응답 body 구조

```js
{
  id: number,
  title: string,
  teamId: string,
  createAt: string,
  updatedAt: string,
}
```

| 필드      | 타입              | 필수 | 설명                                     |
| --------- | ----------------- | ---- | ---------------------------------------- |
| id        | number            | true | 생성된 컬럼의 고유 ID                    |
| title     | string            | true | 컬럼 제목                                |
| teamId    | string            | true | 해당 컬럼이 속한 팀 ID                   |
| createdAt | string (ISO 형식) | true | 컬럼 생성일 (예: 2025-11-28T00:00:00Z)   |
| updatedAt | string (ISO 형식) | true | 마지막 수정일 (예: 2025-11-28T00:00:00Z) |

---

### API 이름 : `getColumns(params)`

특정 대시보드에 속한 모든 컬럼 목록을 조회합니다.

### params 구조

```js
{
  dashboardId: number;
}
```

## 요청

### Query Parameters

| 필드        | 타입   | 필수 | 설명               |
| ----------- | ------ | ---- | ------------------ |
| dashboardId | number | true | 조회할 대시보드 ID |

---

## 응답

### 응답 body 구조

```js
{
  result: "SUCCESS",
  data: (
    {
      id: number,
      title: string,
      teamId: string,
      createdAt: string,
      updatedAt: string
    }[]
  ) | null
}
```

| 필드   | 타입             | 필수  | 설명                              |
| ------ | ---------------- | ----- | --------------------------------- |
| result | string           | true  | API 처리 상태 (`SUCCESS` 고정)    |
| data   | Column[] \| null | false | 컬럼 배열 (컬럼이 없을 경우 null) |

---

## Column 객체

| 필드      | 타입              | 필수 | 설명                   |
| --------- | ----------------- | ---- | ---------------------- |
| id        | number            | true | 컬럼 고유 ID           |
| title     | string            | true | 컬럼 제목              |
| teamId    | string            | true | 해당 컬럼이 속한 팀 ID |
| createdAt | string (ISO 형식) | true | 컬럼 생성일            |
| updatedAt | string (ISO 형식) | true | 컬럼 수정일            |

---

### API 이름 : `updateColumn(columnId, data)`

특정 컬럼의 제목을 수정합니다.

### data 구조

```js
{
  title: string;
}
```

## 요청

### Path Parameter

| 필드     | 타입   | 필수 | 설명                  |
| -------- | ------ | ---- | --------------------- |
| columnId | number | true | 수정할 컬럼의 고유 ID |

### Request Body

| 필드  | 타입   | 필수 | 설명         |
| ----- | ------ | ---- | ------------ |
| title | string | true | 새 컬럼 제목 |

---

## 응답

### 응답 body 구조

```js
{
  id: number,
  title: string,
  teamId: string,
  createdAt: string,
  updatedAt: string
}
```

| 필드      | 타입              | 필수 | 설명                   |
| --------- | ----------------- | ---- | ---------------------- |
| id        | number            | true | 컬럼 고유 ID           |
| title     | string            | true | 컬럼 제목              |
| teamId    | string            | true | 해당 컬럼이 속한 팀 ID |
| createdAt | string (ISO 형식) | true | 컬럼 생성일            |
| updatedAt | string (ISO 형식) | true | 컬럼 수정일            |

---

### API 이름 : `deleteColumn(columnId)`

특정 컬럼을 삭제합니다.

---

## 요청

### Path Parameter

| 필드     | 타입   | 필수 | 설명                  |
| -------- | ------ | ---- | --------------------- |
| columnId | number | true | 삭제할 컬럼의 고유 ID |

---

## 응답

HTTP 상태 코드: `204 No Content`  
이 API는 응답 본문(body)을 반환하지 않습니다.

### 참고

- 성공 시 반환값 없이 204 상태만 내려옵니다.
- 실패 시 HttpError가 throw되므로 반드시 try...catch로 처리해야 합니다.
