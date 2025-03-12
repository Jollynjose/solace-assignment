import { union, z } from 'zod';
import { paginationValidator } from './pagination';

const advocatesValues = [
  'id',
  'firstName',
  'lastName',
  'degree',
  'city',
] as const;

export const advocatesParamsValidator = z.object({
  ...paginationValidator.shape,
  ...z.object({
    search: z.string().optional(),
    orderBy: z
      .enum(['id', 'firstName', 'lastName', 'degree', 'city'])
      .refine((value) => typeof value === 'string')
      .refine((value) => advocatesValues.includes(value)),
  }).shape,
});
