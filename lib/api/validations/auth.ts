import { z } from 'zod';
import { Email, Password, Id, Nickname, URL, ISODateTime } from './common';

export const UserSchema = z.object({
  id: Id,
  email: Email,
  nickname: Nickname,
  profileImageUrl: URL,
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

// 로그인 요청 및 응답 DTO
export const LoginReqDto = z.object({
  email: Email,
  password: Password,
});

export const LoginResDto = z.object({
  user: UserSchema,
});

export type LoginRequest = z.infer<typeof LoginReqDto>;
export type LoginResponse = z.infer<typeof LoginResDto>;

// 백엔드 로그인 응답 DTO (액세스 토큰 포함)
export const LoginBackendResDto = LoginResDto.extend({
  accessToken: z.string(),
});

export type LoginBackendResponse = z.infer<typeof LoginBackendResDto>;

// 비밀번호 변경 유효성 검사 스키마
export const PasswordChangeDto = z.object({
  password: Password,
  newPassword: Password,
});

export type PasswordChange = z.infer<typeof PasswordChangeDto>;
