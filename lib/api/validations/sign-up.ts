import { z } from 'zod';

export const Email = z.email();
export const Nickname = z.string().min(2).max(8);
export const Password = z.string().min(8).max(16);

export const signUpReqDto = z.object({
  email: Email,
  nickname: Nickname,
  password: Password,
});

export type SignUpRequest = z.infer<typeof signUpReqDto>;

export const signUpResDto = z.object({
  id: z.number().int().positive(),
  email: Email,
  nickname: Nickname,
  profileImageUrl: z.url().or(z.literal('')),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type SignUpResponse = z.infer<typeof signUpResDto>;
