import { z } from 'zod';

export const Id = z.number().int().positive();
export const Title = z.string().min(1).max(16);
export const Description = z.string().max(256);
export const dueDate = z.iso.datetime().or(z.literal(''));
export const Tags = z.array(z.string().min(1).max(12)).max(10);
export const URL = z.url().or(z.literal(''));

export const CardAssigneeSchema = z.object({
  profileImageUrl: URL,
  nickname: z.string(),
  id: Id,
});

export const createCardReqDto = z.object({
  assigneeUserId: Id,
  dashboardId: Id,
  columnId: Id,
  title: Title,
  description: Description,
  dueDate: dueDate,
  tags: Tags,
  url: URL,
});

export const createCardResDto = z.object({
  id: Id,
  title: Title,
  description: Description,
  tags: Tags,
  dueDate: dueDate,
  assignee: CardAssigneeSchema,
  imageUrl: URL,
  teamId: z.string(),
  columnId: Id,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateCardRequest = z.infer<typeof createCardReqDto>;
export type CreateCardResponse = z.infer<typeof createCardResDto>;
