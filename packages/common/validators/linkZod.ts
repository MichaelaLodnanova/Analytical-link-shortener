import z from 'zod';

export const getLinkZod = z
  .object({
    id: z.string().nonempty(),
  })
  .strict();
export type GetLinkSchema = z.infer<typeof getLinkZod>;

export const getAllLinksZod = z
  .object({
    userId: z.string().nonempty(),
  })
  .strict();
export type GetAllLinksSchema = z.infer<typeof getAllLinksZod>;

export const createLinkZod = z
  .object({
    createdById: z.string().nonempty(),
    url: z.string().nonempty().url(),
    isAdvertisementEnabled: z.boolean(),
  })
  .strict();
export type CreateLinkSchema = z.infer<typeof createLinkZod>;

export const updateLinkParamsZod = getLinkZod;
export type UpdateLinkParamsSchema = z.infer<typeof updateLinkParamsZod>;

export const updateLinkBodyZod = z
  .object({
    isAdvertisementEnabled: z.boolean(),
  })
  .strict();
export type UpdateLinkBodySchema = z.infer<typeof updateLinkBodyZod>;

export const paginationZod = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    size: z.coerce.number().int().positive().optional(),
  })
  .strict();
export type PaginationSchema = z.infer<typeof paginationZod>;
