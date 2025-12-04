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
export const Title = z.string().min(1).max(16);
