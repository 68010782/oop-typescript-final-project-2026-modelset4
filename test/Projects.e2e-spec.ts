import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Project API (e2e)', () => {
  let app: INestApplication;
  let projectId: number;

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
        name: 'Test Project',
        description: 'Test description'
      })
      .expect(201);

    projectId = res.body.data.id;
  });

  it('Get all projects', () => {
    return request(app.getHttpServer())
      .get('/projects')
      .expect(200);
  });

  it('Get project by id', () => {
    return request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .expect(200);
  });

  it('Update project', () => {
    return request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .send({
        name: 'Updated Project'
      })
      .expect(200);
  });

  it('Delete project', () => {
    return request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});