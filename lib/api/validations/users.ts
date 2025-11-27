import { z } from 'zod';
import { Email, Nickname, Password, URL } from './common';
import { UserSchema } from './auth';

// 회원가입 요청 및 응답 DTO
export const signUpReqDto = z.object({
  email: Email,
  nickname: Nickname,
  password: Password,
});

export const signUpResDto = UserSchema;

export type SignUpRequest = z.infer<typeof signUpReqDto>;
export type SignUpResponse = z.infer<typeof signUpResDto>;

export const updateProfileReqDto = z.object({
  nickname: Nickname,
  profileImageUrl: URL.nullable(),
});

export const updateProfileResDto = UserSchema;

export type UpdateProfileRequest = z.infer<typeof updateProfileReqDto>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResDto>;
export type User = z.infer<typeof UserSchema>;
