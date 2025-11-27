import { z } from 'zod';
import { Id, ISODateTime, Email, Nickname, URL } from './common';

const MemberSchema = z.object({
  id: Id,
  nickname: Nickname,
  email: Email,
  profileUrl: URL.nullable(),
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
  isOwner: z.boolean(),
});

export const getDashboardMembersQueryDto = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().nonnegative().default(20),
  dashboardId: z.coerce.number().int().positive(),
});

export const getDashboardMembersResDto = z.object({
  members: z.array(MemberSchema),
  totalCount: z.number().int().nonnegative(),
});

export type GetDashboardMembersQuery = z.infer<typeof getDashboardMembersQueryDto>;
export type GetDashboardMembersResponse = z.infer<typeof getDashboardMembersResDto>;
