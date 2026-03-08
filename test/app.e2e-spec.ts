import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Project + Task API (e2e)', () => {

  let app: INestApplication;
  let projectId: number;
  let taskId: string;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  it('Create Project', async () => {

    const res = await request(app.getHttpServer())
      .post('/projects')
      .send({
        name: "Test Project",
        description: "Testing",
        status: "active",
        deadline: "2026-12-31"
      })
      .expect(201);

    projectId = res.body.data.id;
  });

  it('Create Task', async () => {

    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: "Test Task",
        description: "Task for project",
        status: "todo",
        priority: "high",
        deadline: "2026-10-01",
        assignedTo: "Alice",
        projectId: projectId,
        createdAt: "2026-03-08",
        updatedAt: "2026-03-08"
      })
      .expect(201);

    taskId = res.body.id;
  });

  it('Get all projects', () => {
    return request(app.getHttpServer())
      .get('/projects')
      .expect(200);
  });

  it('Get all tasks', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200);
  });

  it('Get task by id', () => {
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);
  });

  it('Update task', () => {
    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({
        title: "Updated Task"
      })
      .expect(200);
  });

  it('Delete task', () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);
  });

});