import { z } from 'zod';

const VALUES = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
export const PouchSizeEnum = z.enum(VALUES);

export type PouchSize = z.infer<typeof PouchSizeEnum>;