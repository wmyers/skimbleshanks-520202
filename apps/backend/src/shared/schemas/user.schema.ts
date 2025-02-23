import { z } from 'zod';

import { CatSchema } from './cat.schema';

export const userSchema = z
  .object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    cats: z.array(CatSchema),
  })
  .strict();

  export type User = z.infer<typeof userSchema>;