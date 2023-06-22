import { z } from 'zod';

export const paginationZod = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number),
  offset: z.string().regex(/^\d+$/).transform(Number),
  search: z.string().optional(),
});
export type PaginationSchema = z.infer<typeof paginationZod>;
