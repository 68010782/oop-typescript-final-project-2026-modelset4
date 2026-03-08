import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Task API (e2e)', () => {
  let app: INestApplication;
  let projectId!: number;
  let taskId!: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // create project
    const res = await request(app.getHttpServer())
      .post('/projects')
      .send({
        name: 'Task Test Project',
        description: 'Test project'
      })
      .expect(201);

    projectId = res.body.id;   // ⭐ แก้ตรงนี้
  });

  it('Create Task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Task description',
        status: 'todo',
        projectId: projectId
      })
      .expect(201);

    taskId = res.body.id;
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
        title: 'Updated Task'
      })
      .expect(200);
  });

  it('Delete task', () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});