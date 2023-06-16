import z from 'zod';

export const contactFormZod = z.object({
  email: z.string().nonempty().email(),
  name: z.string().nonempty().min(3).max(20),
  surname: z.string().nonempty().min(3).max(40),
  phone: z.string().refine((value) => /^\+[1-9]\d{1,14}$/.test(value), {
    message: 'Invalid phone number format',
  }),
  message: z.string().nonempty().min(3).max(250),
});
export type ContactFormSchema = z.infer<typeof contactFormZod>;
