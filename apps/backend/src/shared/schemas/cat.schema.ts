import { z } from 'zod';

import { PouchSizeEnum } from './pouch.schema';

export const CatSchema = z
  .object({
    name: z.string(),
    subscriptionActive: z.boolean(),
    breed: z.string(),
    pouchSize: PouchSizeEnum,
  })
  .strict();

export type Cat = z.infer<typeof CatSchema>;
