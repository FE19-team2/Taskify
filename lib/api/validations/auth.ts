import { z } from 'zod';

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

export const LoginReqDto = z.object({
  email: Email,
  password: Password,
});

export const LoginResDto = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type LoginRequest = z.infer<typeof LoginReqDto>;
export type LoginResponse = z.infer<typeof LoginResDto>;

export const PasswordChangeDto = z.object({
  password: Password,
  newPassword: Password,
});

export type PasswordChange = z.infer<typeof PasswordChangeDto>;
