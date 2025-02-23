import { z } from 'zod';

export const DeliveryMessageSchema = z
  .object({
    title: z.string(),
    message: z.string(),
    totalPrice: z.string().regex(/d+.dd/),
    freeGift: z.boolean(),
  })
  .strict();

export type DeliveryMessage = z.infer<typeof DeliveryMessageSchema>;