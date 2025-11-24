import { z } from 'zod';

// 로그인 유효성 검사 스키마
export const Email = z.email();
export const Password = z.string().min(8).max(16);

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: Email,
  nickname: z.string().min(2).max(8),
  profileImageUrl: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// 로그인 요청 및 응답 DTO
export const LoginReqDto = z.object({
  email: Email,
  password: Password,
});

export const LoginResDto = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

// 타입 추출
export type LoginRequest = z.infer<typeof LoginReqDto>;
export type LoginResponse = z.infer<typeof LoginResDto>;

// 비밀번호 변경 유효성 검사 스키마
export const PasswordChangeDto = z.object({
  password: Password,
  newPassword: Password,
});

// 타입 추출
export type PasswordChange = z.infer<typeof PasswordChangeDto>;
