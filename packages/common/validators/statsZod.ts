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

export const postLinkStatsZod = z
  .object({
    id: z.string().nonempty().optional(),
  })
  .merge(dateRangeZod)
  .strict();
export type PostLinkStatsSchema = z.infer<typeof postLinkStatsZod>;

export const postAdvertisementStatsZod = z
  .object({
    advertisementId: z.string().nonempty(),
    linkId: z.string().nonempty(),
    skippedAt: z.string().nonempty().optional(),
    clickedAt: z.string().nonempty().optional(),
    region: z.string().nonempty(),
    language: z.string().nonempty(),
  })
  .strict();
export type PostAdvertisementStatsSchema = z.infer<
  typeof postAdvertisementStatsZod
>;

export const patchAdvertisementStatsParamsZod = z
  .object({
    id: z.string().nonempty(), // should be .uuid(), but seed data uses basic strings
  })
  .strict();
export type PatchAdvertisementStatsParamsSchema = z.infer<
  typeof patchAdvertisementStatsParamsZod
>;

export const patchAdvertisementStatsBodyZod = z
  .object({
    skippedAt: z.string().nonempty().optional(),
    clickedAt: z.string().nonempty().optional(),
  })
  .strict();
export type PatchAdvertisementStatsBodySchema = z.infer<
  typeof patchAdvertisementStatsBodyZod
>;
