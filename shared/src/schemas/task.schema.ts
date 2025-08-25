import z from "zod";

const titleSchema = z
  .string()
  .min(2, { message: "Título deve ter pelo menos 2 caracteres" })
  .max(100, { message: "Título deve ter no máximo 100 caracteres" });

const prioritySchema = z.number().int().nonnegative().min(0);

const completedSchema = z.boolean();

export const createTaskSchema = z.object({
  title: titleSchema,
  priority: prioritySchema.optional(),
  completed: completedSchema.default(false),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: titleSchema.optional(),
  priority: prioritySchema.optional(),
  completed: completedSchema.optional(),
});

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
