import { z } from 'zod';

export const dateZod = z.string().datetime();

export const dateRangeZod = z.object({
  from: dateZod.optional(),
  to: dateZod.optional(),
});
