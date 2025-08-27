import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createServer } from '@/app';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import { cleanDatabase, disconnectDatabase, createTestTask } from '../setup/database';

describe('TaskController Integration Tests', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createServer();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  afterEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('GET /api/v1/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await request(app.server).get('/api/v1/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      const task1 = await createTestTask({
        title: 'Test Task 1',
        description: 'Description for task 1',
        priority: 1,
        completed: false,
      });

      const task2 = await createTestTask({
        title: 'Test Task 2',
        priority: 2,
        completed: true,
      });

      const response = await request(app.server).get('/api/v1/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: task1.id,
            title: 'Test Task 1',
            description: 'Description for task 1',
            priority: 1,
            completed: false,
          }),
          expect.objectContaining({
            id: task2.id,
            title: 'Test Task 2',
            description: null,
            priority: 2,
            completed: true,
          }),
        ]),
      );
    });
  });

  describe('POST /api/v1/tasks', () => {
    it('should create a new task with all fields', async () => {
      const newTask = {
        title: 'New Task',
        description: 'Task description',
        priority: 3,
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTask);

      // Verificar se foi realmente criado no banco
      const getAllResponse = await request(app.server).get('/api/v1/tasks');
      expect(getAllResponse.body).toHaveLength(1);
      expect(getAllResponse.body[0]).toEqual(
        expect.objectContaining({
          title: 'New Task',
          description: 'Task description',
          priority: 3,
          completed: false,
        }),
      );
    });

    it('should create a new task with default values', async () => {
      const newTask = {
        title: 'New Task',
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTask);

      // Verificar se foi criado com valores padrão
      const getAllResponse = await request(app.server).get('/api/v1/tasks');
      expect(getAllResponse.body[0]).toEqual(
        expect.objectContaining({
          title: 'New Task',
          description: null,
          priority: 0, // valor padrão
          completed: false,
        }),
      );
    });

    it('should create a new task with description only', async () => {
      const newTask = {
        title: 'New Task',
        description: 'Only description provided',
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTask);

      // Verificar se foi criado corretamente
      const getAllResponse = await request(app.server).get('/api/v1/tasks');
      expect(getAllResponse.body[0]).toEqual(
        expect.objectContaining({
          title: 'New Task',
          description: 'Only description provided',
          priority: 0,
          completed: false,
        }),
      );
    });

    it('should return 400 for invalid title (too short)', async () => {
      const newTask = {
        title: 'A', // muito curto (min 2)
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid title (too long)', async () => {
      const newTask = {
        title: 'A'.repeat(101), // muito longo (max 100)
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(400);
    });

    it('should return 400 for negative priority', async () => {
      const newTask = {
        title: 'Valid Title',
        priority: -1,
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(400);
    });

    it('should return 400 for description too long', async () => {
      const newTask = {
        title: 'Valid Title',
        description: 'A'.repeat(501), // muito longo (max 500)
        completed: false,
      };

      const response = await request(app.server).post('/api/v1/tasks').send(newTask);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/v1/tasks/:id', () => {
    it('should update an existing task', async () => {
      const existingTask = await createTestTask({
        title: 'Original Task',
        description: 'Original description',
        priority: 1,
        completed: false,
      });

      const updateData = {
        title: 'Updated Task',
        description: 'Updated description',
        priority: 5,
        completed: true,
      };

      const response = await request(app.server).put(`/api/v1/tasks/${existingTask.id}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: existingTask.id,
          title: 'Updated Task',
          description: 'Updated description',
          priority: 5,
          completed: true,
        }),
      );

      // Verificar se foi realmente atualizado no banco
      const getAllResponse = await request(app.server).get('/api/v1/tasks');
      expect(getAllResponse.body[0]).toEqual(
        expect.objectContaining({
          title: 'Updated Task',
          description: 'Updated description',
          priority: 5,
          completed: true,
        }),
      );
    });

    it('should update only specific fields', async () => {
      const existingTask = await createTestTask({
        title: 'Original Task',
        description: 'Original description',
        priority: 1,
        completed: false,
      });

      const updateData = {
        description: 'Updated description only',
        completed: true, // só alterar description e completed
      };

      const response = await request(app.server).put(`/api/v1/tasks/${existingTask.id}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: existingTask.id,
          title: 'Original Task', // não alterado
          description: 'Updated description only',
          priority: 1, // não alterado
          completed: true,
        }),
      );
    });

    it('should return 404 for non-existent task', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true,
      };

      const response = await request(app.server).put('/api/v1/tasks/999999').send(updateData);

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid id parameter', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true,
      };

      const response = await request(app.server).put('/api/v1/tasks/invalid-id').send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid update data', async () => {
      const existingTask = await createTestTask({
        title: 'Original Task',
        priority: 1,
        completed: false,
      });

      const updateData = {
        title: 'A', // muito curto
        priority: -1, // negativo
      };

      const response = await request(app.server).put(`/api/v1/tasks/${existingTask.id}`).send(updateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const existingTask = await createTestTask({
        title: 'Task to Delete',
        description: 'Description to delete',
        priority: 1,
        completed: false,
      });

      const response = await request(app.server).delete(`/api/v1/tasks/${existingTask.id}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      // Verificar se foi realmente deletado do banco
      const getAllResponse = await request(app.server).get('/api/v1/tasks');
      expect(getAllResponse.body).toHaveLength(0);
    });

    it('should return 400 for invalid id parameter', async () => {
      const response = await request(app.server).delete('/api/v1/tasks/invalid-id');

      expect(response.status).toBe(400);
    });

    it('should not throw error when deleting non-existent task', async () => {
      const response = await request(app.server).delete('/api/v1/tasks/999999');

      expect(response.status).toBe(500);
    });
  });
});
