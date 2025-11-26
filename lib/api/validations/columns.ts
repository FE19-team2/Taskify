import { z } from 'zod';

export const Title = z.string().min(1).max(32);
export const Id = z.number().int().positive();

export const createColumnReqDto = z.object({
  title: Title,
  dashboardId: Id,
});

export const createColumnResDto = z.object({
  id: Id,
  title: Title,
  teamId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateColumnRequest = z.infer<typeof createColumnReqDto>;
export type CreateColumnResponse = z.infer<typeof createColumnResDto>;

export const getColumnsResDto = z.object({
  result: z.enum(['SUCCESS']),
  data: z.array(createColumnResDto),
});

export type GetColumnsResponse = z.infer<typeof getColumnsResDto>;

export const editColumnReqDto = z.object({
  title: Title,
});
export const editColumnResDto = createColumnResDto;

export type EditColumnResponse = z.infer<typeof editColumnResDto>;
export type EditColumnRequest = z.infer<typeof editColumnReqDto>;
