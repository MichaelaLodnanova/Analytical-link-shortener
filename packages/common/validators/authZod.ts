import z from 'zod';

export const registerUserZod = z.object({
  email: z.string().nonempty().email(),
  username: z.string().nonempty().min(3).max(20),
  name: z.string(),
  surname: z.string(),
  password: z.string().nonempty().min(8).max(20),
});
export type RegisterUserSchema = z.infer<typeof registerUserZod>;

export const loginUserZod = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});
export type LoginUserSchema = z.infer<typeof loginUserZod>;

export const updateUserZod = z
  .object({
    name: z.string().optional(),
    surname: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.preprocess((newPassword) => {
      if (!newPassword || typeof newPassword !== 'string') return undefined;
      return newPassword === '' ? undefined : newPassword;
    }, z.string().min(8).max(20).optional()),
  })
  .superRefine((values, ctx) => {
    if (
      (values.oldPassword && !values.newPassword) ||
      (!values.oldPassword && values.newPassword)
    ) {
      ctx.addIssue({
        message: 'Both old password and new password must be filled togertger.',
        code: z.ZodIssueCode.custom,
        path: ['oldPassword'],
      });
    }
  });
export type UpdateUserSchema = z.infer<typeof updateUserZod>;
