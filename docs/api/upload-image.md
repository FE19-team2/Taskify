# API 사용법

사용하려는 파일에서 아래와 같이 import 후 사용합니다.

```js
import { API } from '@/services/...';
```

필수 입력값이 아닌 경우 타입에 `null`이 함께 표기됩니다.  
`ex) string | null`

## ImageUpload API (upload-image.service.ts)

### API 이름 : `uploadImage(params)`

이미지를 업로드합니다.

- `columnId`가 있는 경우: 컬럼 카드 이미지를 업로드합니다.
- `columnId`가 없는 경우: 사용자 프로필 이미지를 업로드합니다.

### params 구조

```js
{
  columnId?: number,
  file: File
}
```

## 요청

### Path Parameter (columnId가 있는 경우에만 사용)

| 필드     | 타입   | 필수  | 설명                                                     |
| -------- | ------ | ----- | -------------------------------------------------------- |
| columnId | number | false | 이미지를 업로드할 컬럼의 ID (지정 시 카드 이미지 업로드) |

### Request Body (multipart/form-data)

FormData로 전송됩니다.

| 필드  | 타입 | 필수 | 설명                                                     |
| ----- | ---- | ---- | -------------------------------------------------------- |
| image | File | true | 업로드할 이미지 파일 (params.file이 image 필드로 전송됨) |

---

## 응답

### 응답 body 구조

```js
{
  imageUrl?: string,
  profileImageUrl?: string
}
```

| 필드            | 타입   | 필수  | 설명                                               |
| --------------- | ------ | ----- | -------------------------------------------------- |
| imageUrl        | string | false | 컬럼 카드 이미지 URL (columnId가 있을 때 사용)     |
| profileImageUrl | string | false | 사용자 프로필 이미지 URL (columnId가 없을 때 사용) |

## 주의

실제 응답에서는 상황에 따라 `imageUrl` 또는 `profileImageUrl` 중 하나만 채워집니다.

## 동작 정리

- columnId가 존재하는 경우

해당 컬럼의 카드 이미지가 업로드됩니다.  
응답에서 `imageUrl` 필드가 채워집니다.

- columnId가 없는 경우
  현재 로그인한 사용자의 프로필 이미지가 업로드됩니다.  
  응답에서 `profileImageUrl` 필드가 채워집니다.
