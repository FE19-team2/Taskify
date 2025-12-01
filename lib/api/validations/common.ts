import { z } from 'zod';

export const Email = z.email();
export const Password = z.string().min(8).max(16);
export const Id = z.number().int().positive();
export const Nickname = z.string().min(2).max(10);
export const URL = z.url().or(z.null());
export const ISODateTime = z.iso.datetime({ offset: true }).or(z.null());
export const Title = z.string().min(1).max(16);
