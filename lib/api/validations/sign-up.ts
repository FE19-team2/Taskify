import { z } from 'zod';

// 회원가입 유효성 검사 스키마
export const Email = z.email();
export const Nickname = z.string().min(2).max(10);
export const Password = z.string().min(8).max(16);

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
