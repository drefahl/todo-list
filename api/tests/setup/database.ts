import { prisma } from '@/lib/prisma';
import { CreateTaskDTO } from '@/modules/tasks/task.dtos';

export async function cleanDatabase() {
  await prisma.task.deleteMany();
  await new Promise((resolve) => setTimeout(resolve, 10));
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export async function createTestTask(data: CreateTaskDTO) {
  return prisma.task.create({
    data: {
      title: data.title,
      priority: data.priority ?? 0,
      completed: data.completed ?? false,
    },
  });
}
