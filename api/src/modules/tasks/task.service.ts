import { NotFoundError } from '@/errors/NotFoundError';
import { CreateTaskDTO, UpdateTaskDTO } from 'shared';
import { TaskRepository } from './task.repo';

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository = new TaskRepository()) {}

  async getAll() {
    return this.taskRepository.findAll();
  }

  async create(data: CreateTaskDTO) {
    await this.taskRepository.create(data);
    return data;
  }

  async update(id: number, data: UpdateTaskDTO) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundError('Task not found');

    await this.taskRepository.update(id, data);
    return this.taskRepository.findOne(id);
  }

  async delete(id: number) {
    await this.taskRepository.delete(id);
  }
}
