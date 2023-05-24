import z from 'zod';

export const exampleValidator = z.object({
  name: z.string(),
  age: z.number(),
});
