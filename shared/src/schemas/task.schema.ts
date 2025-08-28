import z from "zod";

const titleSchema = z
  .string()
  .min(2, { message: "Título deve ter pelo menos 2 caracteres" })
  .max(100, { message: "Título deve ter no máximo 100 caracteres" });

const descriptionSchema = z
  .string()
  .max(500, { message: "Descrição deve ter no máximo 500 caracteres" })
  .optional();

const prioritySchema = z.number().int().nonnegative().min(0);

const completedSchema = z.boolean();

const timeSchema = z.string().optional();

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema.optional(),
  time: timeSchema,
  completed: completedSchema.default(false),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema,
  priority: prioritySchema.optional(),
  time: timeSchema,
  completed: completedSchema.optional(),
});

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
