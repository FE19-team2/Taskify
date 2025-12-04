import { z } from 'zod';
import { Id, ISODateTime, Email, Nickname, URL } from './common';

const MemberSchema = z.object({
  id: Id,
  userId: Id,
  nickname: Nickname,
  email: Email,
  profileImageUrl: URL.nullable(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
  isOwner: z.boolean(),
});

export const getDashboardMembersQueryDto = z.object({
  page: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().positive().optional()),
  size: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().positive().optional()),
  dashboardId: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .pipe(z.number().int().positive()),
});

export const getDashboardMembersResDto = z.object({
  members: z.array(MemberSchema),
  totalCount: z.number().int().nonnegative(),
});

export type GetDashboardMembersQuery = z.infer<typeof getDashboardMembersQueryDto>;
export type GetDashboardMembersResponse = z.infer<typeof getDashboardMembersResDto>;
