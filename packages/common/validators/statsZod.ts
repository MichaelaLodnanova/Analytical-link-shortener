import { z } from 'zod';
import { dateRangeZod } from './utilsZod';

export const linkStatsZod = z
  .object({
    id: z.string().nonempty().optional(),
  })
  .merge(dateRangeZod)
  .strict();
export type LinkStatsSchema = z.infer<typeof linkStatsZod>;

export const advertisementStatsZod = linkStatsZod;
export type AdvertisementStatsSchema = z.infer<typeof advertisementStatsZod>;
