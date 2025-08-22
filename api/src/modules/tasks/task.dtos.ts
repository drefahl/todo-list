import z from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(2).max(100),
  priority: z.number().int().nonnegative().min(0).optional(),
  completed: z.boolean().default(false),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  priority: z.number().int().nonnegative().min(0).optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
