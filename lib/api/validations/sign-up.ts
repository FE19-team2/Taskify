import { z } from 'zod';
import { Email, Nickname, Password } from './common';

// 회원가입 요청 및 응답 DTO
export const signUpReqDto = z.object({
  email: Email,
  nickname: Nickname,
  password: Password,
});

export const signUpResDto = z.object({
  id: z.number().int().positive(),
  email: Email,
  nickname: Nickname,
  profileImageUrl: z.url().or(z.null()),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// 타입 추출
export type SignUpRequest = z.infer<typeof signUpReqDto>;
export type SignUpResponse = z.infer<typeof signUpResDto>;
