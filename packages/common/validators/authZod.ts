import z from 'zod';

export const registerUserZod = z.object({
  email: z.string().nonempty().email(),
  username: z.string().nonempty().min(3).max(20),
  password: z.string().nonempty().min(8).max(20),
});
export type RegisterUserSchema = z.infer<typeof registerUserZod>;

export const loginUserZod = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});
export type LoginUserSchema = z.infer<typeof loginUserZod>;
