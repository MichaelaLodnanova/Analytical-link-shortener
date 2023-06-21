import z from 'zod';

export const getAdvertisementZod = z
  .object({
    id: z.string().nonempty(), // should be .uuid(), but seed data uses basic strings
  })
  .strict();
export type GetAdvertisementSchema = z.infer<typeof getAdvertisementZod>;

export const getAllAdvertisementsZod = z
  .object({
    userId: z.string().nonempty().uuid().optional(),
  })
  .strict();
export type GetAllAdvertisementsSchema = z.infer<
  typeof getAllAdvertisementsZod
>;

export const createAdvertisementZod = z
  .object({
    title: z.string().nonempty(),
    adUrl: z.string().nonempty().url(),
    forwardUrl: z.string().nonempty().url(),
  })
  .strict();
export type CreateAdvertisementSchema = z.infer<typeof createAdvertisementZod>;

export const updateAdvertisementParamsZod = getAdvertisementZod;
export type UpdateAdvertisementParamsSchema = z.infer<
  typeof updateAdvertisementParamsZod
>;

export const updateAdvertisementBodyZod = z
  .object({
    title: z.string().nonempty().optional(),
    adUrl: z.string().nonempty().url().optional(),
    forwardUrl: z.string().nonempty().url().optional(),
  })
  .strict();
export type UpdateAdvertisementBodySchema = z.infer<
  typeof updateAdvertisementBodyZod
>;

export const deleteAdvertisementZod = getAdvertisementZod;
export type DeleteAdvertisementSchema = z.infer<typeof deleteAdvertisementZod>;
