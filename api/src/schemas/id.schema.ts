import { z } from 'zod';

export const positiveIntegerIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
