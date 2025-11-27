import { z } from 'zod';
import { Id, Title } from './common';
import { sendDashboardInvitationResDto } from './dashboards';

export const getInvitationsQueryDto = z.object({
  cursorId: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().nonnegative().default(10),
  title: Title.optional(),
});

export const getInvitationsResDto = z.object({
  cursorId: Id.nullable(),
  invitations: z.array(sendDashboardInvitationResDto),
});
