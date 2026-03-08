import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Project + Task E2E', () => {
  let app: INestApplication;
  let projectId: number;
  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create Project', async () => {
    const res = await request(app.getHttpServer())
      .post('/projects')
      .send({
        name: 'Test Project',
        description: 'Project for testing',
        status: 'planning',
        deadline: '2030-12-31'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    projectId = res.body.data.id;
  });

  it('Get All Projects', async () => {
    const res = await request(app.getHttpServer())
      .get('/projects');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('Create Task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Task 1',
        deadline: '2030-01-01',
        projectId: projectId
      });

    expect(res.status).toBe(201);

    taskId = res.body.id;
  });

  it('Get All Tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Get Tasks by projectId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks?projectId=${projectId}`);

    expect(res.status).toBe(200);
    expect(res.body[0].projectId).toBe(projectId);
  });

  it('Update Task', async () => {
    const res = await request(app.getHttpServer())
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        status: 'IN_PROGRESS'
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Task');
  });

  it('Fail delete project when tasks exist', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/projects/${projectId}`);

    expect(res.status).toBe(400);
  });

  it('Delete Task', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`);

    expect(res.status).toBe(200);
  });

  it('Delete Project after tasks removed', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/projects/${projectId}`);

    expect(res.status).toBe(200);
  });
});