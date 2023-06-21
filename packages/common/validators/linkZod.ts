import z from 'zod';

export const getLinkZod = z
  .object({
    id: z.string().nonempty(), // should be .uuid(), but seed data uses basic strings
  })
  .strict();
export type GetLinkSchema = z.infer<typeof getLinkZod>;

export const getAllLinksZod = z
  .object({
    userId: z.string().nonempty().uuid(),
  })
  .strict();
export type GetAllLinksSchema = z.infer<typeof getAllLinksZod>;

export const createLinkZod = z
  .object({
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

export const deleteLinkZod = getLinkZod;
export type DeleteLinkSchema = z.infer<typeof deleteLinkZod>;

export const viewLinkZod = z
  .object({
    region: z.string(),
    language: z.string(),
  })
  .strict();
export type ViewLinkSchema = z.infer<typeof viewLinkZod>;
