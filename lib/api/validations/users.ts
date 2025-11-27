import { z } from 'zod';
import { Id, Email, Nickname, Password, URL, ISODateTime } from './common';

// 회원가입 요청 및 응답 DTO
export const signUpReqDto = z.object({
  email: Email,
  nickname: Nickname,
  password: Password,
});

export const signUpResDto = z.object({
  id: Id,
  email: Email,
  nickname: Nickname,
  profileImageUrl: URL.nullable(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

export type SignUpRequest = z.infer<typeof signUpReqDto>;
export type SignUpResponse = z.infer<typeof signUpResDto>;

export const updateProfileReqDto = z.object({
  nickname: Nickname,
  profileImageUrl: URL.nullable(),
});

export const updateProfileResDto = signUpResDto;

export type UpdateProfileRequest = z.infer<typeof updateProfileReqDto>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResDto>;
