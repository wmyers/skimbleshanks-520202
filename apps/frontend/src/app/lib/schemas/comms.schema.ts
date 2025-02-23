import { z } from 'zod';

export const ExceptionSchema = z
  .object({
    message: z.string(),
    error: z.string(),
    statusCode: z.number(),
  })
  .strict();

export type Exception = z.infer<typeof ExceptionSchema>;

export const DeliveryMessageResponseSchema = z
  .object({
    title: z.string().optional(),
    message: z.string().optional(),
    totalPrice: z.number().min(0).optional(),
    freeGift: z.boolean().optional(),
    exception: ExceptionSchema.optional(),
  })
  .strict();

export type DeliveryMessageResponse = z.infer<
  typeof DeliveryMessageResponseSchema
>;
