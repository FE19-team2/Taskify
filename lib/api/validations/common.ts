import { z } from 'zod';

export const Email = z.string().email();
export const Password = z.string().min(8).max(16);
export const Id = z.coerce.number().int().nonnegative();
export const Nickname = z.string().min(2).max(10);
export const URL = z
  .string()
  .url()
  .or(z.literal('').transform(() => null))
  .or(z.null());
export const ISODateTime = z.string().datetime({ offset: true }).or(z.null());
export const CustomDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM 형식으로 입력해주세요')
  .or(z.null());
// 백엔드가 응답 시 YYYY-MM-DD HH:MM 형식으로 보내므로 두 형식 모두 허용
export const FlexibleDateTime = z
  .union([
    z.string().datetime({ offset: true }),
    z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
  ])
  .or(z.null());
export const Title = z.string().min(1).max(16);
