import { z } from 'zod';

export const paginationZod = z
  .object({
    limit: z.coerce.number().int().optional(),
    offset: z.coerce.number().int().optional(),
    search: z.string().optional(),
  })
  .strict();
export type PaginationSchema = z.infer<typeof paginationZod>;
