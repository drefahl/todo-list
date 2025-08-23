import { FastifyReply, FastifyRequest } from 'fastify';
import { createTaskSchema, updateTaskSchema } from 'shared';
import { TaskService } from './task.service';

export class TaskController {
  constructor(private readonly taskService: TaskService = new TaskService()) {}

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const tasks = await this.taskService.getAll();
    return reply.status(200).send(tasks);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createTaskSchema.parse(request.body);

    const task = await this.taskService.create(data);
    return reply.status(201).send(task);
  }

  async update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const data = updateTaskSchema.parse(request.body);

    const task = await this.taskService.update(+request.params.id, data);
    return reply.status(200).send(task);
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    await this.taskService.delete(+request.params.id);
    return reply.status(204).send();
  }
}
