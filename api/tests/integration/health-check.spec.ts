import { createServer } from '@/app';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Integration -> Health Check', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createServer();
  });

  it('should return 200', async () => {
    const res = await request(app.server).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ time: expect.any(String), uptime: expect.any(Number) });
  });
});
