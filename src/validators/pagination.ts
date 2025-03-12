import { z } from 'zod';

const orderValues = ['ASC', 'DESC'] as const;

export const paginationValidator = z.object({
  limit: z.number().int().positive().nonnegative(),
  offset: z.number().int().nonnegative(),
  orderType: z
    .enum(['ASC', 'DESC'])
    .refine((value) => orderValues.includes(value)),
});
