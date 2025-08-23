import { prisma } from '@/lib/prisma';
import { CreateTaskDTO, UpdateTaskDTO } from 'shared';

export class TaskRepository {
  async findAll() {
    return prisma.task.findMany();
  }

  async findOne(id: number) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async create(data: CreateTaskDTO) {
    return prisma.task.create({
      data,
    });
  }

  async update(id: number, data: UpdateTaskDTO) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}
