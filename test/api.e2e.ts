import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const internalErrors: string[] = [];
function check500(res: request.Response, label: string) {
  if (res.status === 500) {
    internalErrors.push(label);
  }
}

describe('Task/Project Tracking API (e2e)', () => {
  let app: INestApplication;

  const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const validProject = {
    name: 'Alpha Project',
    description: 'Test project',
    status: 'planning',
    deadline: futureDate,
  };

  let createdProjectId: number;
  let createdTaskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /projects', () => {
    it('201 — creates a project with valid data', async () => {
      const res = await request(app.getHttpServer())
        .post('/projects')
        .send(validProject);
      check500(res, 'POST /projects — valid');

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      createdProjectId = res.body.data.id;
    });

    it('400 — missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post('/projects')
        .send({});
      check500(res, 'POST /projects — empty body');

      expect(res.status).toBe(400);
    });

    it('400 — invalid status enum', async () => {
      const res = await request(app.getHttpServer())
        .post('/projects')
        .send({ ...validProject, status: 'INVALID_STATUS' });
      check500(res, 'POST /projects — bad enum');

      expect(res.status).toBe(400);
    });

    it('400 — deadline in the past', async () => {
      const res = await request(app.getHttpServer())
        .post('/projects')
        .send({ ...validProject, deadline: '2000-01-01' });
      check500(res, 'POST /projects — past deadline');

      expect(res.status).toBe(400);
    });

    it('400 — invalid date format', async () => {
      const res = await request(app.getHttpServer())
        .post('/projects')
        .send({ ...validProject, deadline: 'not-a-date' });
      check500(res, 'POST /projects — bad date format');

      expect(res.status).toBe(400);
    });
  });

  describe('GET /projects', () => {
    it('200 — returns array of projects', async () => {
      const res = await request(app.getHttpServer()).get('/projects');
      check500(res, 'GET /projects');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /projects/:id', () => {
    it('200 — returns existing project', async () => {
      const res = await request(app.getHttpServer()).get(
        `/projects/${createdProjectId}`,
      );
      check500(res, 'GET /projects/:id — valid');

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdProjectId);
    });

    it('404 — project not found', async () => {
      const res = await request(app.getHttpServer()).get('/projects/99999');
      check500(res, 'GET /projects/:id — not found');

      expect(res.status).toBe(404);
    });

    it('400 — non-numeric id', async () => {
      const res = await request(app.getHttpServer()).get('/projects/abc');
      check500(res, 'GET /projects/:id — non-numeric');

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /projects/:id', () => {
    it('200 — fully updates a project', async () => {
      const res = await request(app.getHttpServer())
        .put(`/projects/${createdProjectId}`)
        .send({ ...validProject, name: 'Updated Project' });
      check500(res, 'PUT /projects/:id — valid');

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Updated Project');
    });

    it('404 — update non-existent project', async () => {
      const res = await request(app.getHttpServer())
        .put('/projects/99999')
        .send(validProject);
      check500(res, 'PUT /projects/:id — not found');

      expect(res.status).toBe(404);
    });

    it('400 — missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .put(`/projects/${createdProjectId}`)
        .send({});
      check500(res, 'PUT /projects/:id — empty body');

      expect(res.status).toBe(400);
    });

    it('400 — past deadline on update', async () => {
      const res = await request(app.getHttpServer())
        .put(`/projects/${createdProjectId}`)
        .send({ ...validProject, deadline: '2000-01-01' });
      check500(res, 'PUT /projects/:id — past deadline');

      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /projects/:id', () => {
    it('200 — partially updates a project', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/projects/${createdProjectId}`)
        .send({ status: 'active' });
      check500(res, 'PATCH /projects/:id — valid');

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('active');
    });

    it('404 — patch non-existent project', async () => {
      const res = await request(app.getHttpServer())
        .patch('/projects/99999')
        .send({ status: 'active' });
      check500(res, 'PATCH /projects/:id — not found');

      expect(res.status).toBe(404);
    });

    it('400 — invalid enum in patch', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/projects/${createdProjectId}`)
        .send({ status: 'BAD_ENUM' });
      check500(res, 'PATCH /projects/:id — bad enum');

      expect(res.status).toBe(400);
    });
  });

  describe('POST /tasks', () => {
    it('201 — creates a task with valid data', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'First Task',
          deadline: futureDate,
          projectId: String(createdProjectId),
        });
      check500(res, 'POST /tasks — valid');

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      createdTaskId = res.body.id;
    });

    it('400 — missing title', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .send({ deadline: futureDate, projectId: '1' });
      check500(res, 'POST /tasks — missing title');

      expect(res.status).toBe(400);
    });

    it('400 — missing projectId', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task', deadline: futureDate });
      check500(res, 'POST /tasks — missing projectId');

      expect(res.status).toBe(400);
    });

    it('400 — invalid deadline format', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task', deadline: 'bad-date', projectId: '1' });
      check500(res, 'POST /tasks — bad date');

      expect(res.status).toBe(400);
    });

    it('400 — extra unknown fields rejected', async () => {
      const res = await request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'Task',
          deadline: futureDate,
          projectId: '1',
          unknown: 'field',
        });
      check500(res, 'POST /tasks — unknown fields');

      expect(res.status).toBe(400);
    });
  });

  describe('GET /tasks', () => {
    it('200 — returns all tasks', async () => {
      const res = await request(app.getHttpServer()).get('/tasks');
      check500(res, 'GET /tasks — all');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('200 — filters tasks by projectId', async () => {
      const res = await request(app.getHttpServer()).get(
        `/tasks?projectId=${createdProjectId}`,
      );
      check500(res, 'GET /tasks?projectId — valid');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('200 — returns empty array for unknown projectId', async () => {
      const res = await request(app.getHttpServer()).get(
        '/tasks?projectId=nonexistent-id',
      );
      check500(res, 'GET /tasks?projectId — unknown');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /tasks/:id', () => {
    it('200 — returns existing task', async () => {
      const res = await request(app.getHttpServer()).get(
        `/tasks/${createdTaskId}`,
      );
      check500(res, 'GET /tasks/:id — valid');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(createdTaskId);
    });

    it('404 — task not found', async () => {
      const res = await request(app.getHttpServer()).get(
        '/tasks/00000000-0000-0000-0000-000000000000',
      );
      check500(res, 'GET /tasks/:id — not found');

      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('200 — updates task status', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/tasks/${createdTaskId}`)
        .send({ status: 'IN_PROGRESS' });
      check500(res, 'PATCH /tasks/:id — valid status');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('IN_PROGRESS');
    });

    it('200 — updates task title', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/tasks/${createdTaskId}`)
        .send({ title: 'Updated Title' });
      check500(res, 'PATCH /tasks/:id — valid title');

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });

    it('404 — update non-existent task', async () => {
      const res = await request(app.getHttpServer())
        .patch('/tasks/00000000-0000-0000-0000-000000000000')
        .send({ status: 'DONE' });
      check500(res, 'PATCH /tasks/:id — not found');

      expect(res.status).toBe(404);
    });

    it('400 — invalid status enum', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/tasks/${createdTaskId}`)
        .send({ status: 'INVALID' });
      check500(res, 'PATCH /tasks/:id — bad enum');

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('200 — deletes existing task', async () => {
      const res = await request(app.getHttpServer()).delete(
        `/tasks/${createdTaskId}`,
      );
      check500(res, 'DELETE /tasks/:id — valid');

      expect(res.status).toBe(200);
    });

    it('404 — delete non-existent task', async () => {
      const res = await request(app.getHttpServer()).delete(
        '/tasks/00000000-0000-0000-0000-000000000000',
      );
      check500(res, 'DELETE /tasks/:id — not found');

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /projects/:id', () => {
    it('200 — deletes existing project', async () => {
      const res = await request(app.getHttpServer()).delete(
        `/projects/${createdProjectId}`,
      );
      check500(res, 'DELETE /projects/:id — valid');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('404 — delete non-existent project', async () => {
      const res = await request(app.getHttpServer()).delete('/projects/99999');
      check500(res, 'DELETE /projects/:id — not found');

      expect(res.status).toBe(404);
    });
  });

  describe('500 Audit', () => {
    it('must have 5 or fewer Error 500 occurrences', () => {
      expect(internalErrors.length).toBeLessThanOrEqual(5);
    });
  });
});