/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('Project (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get(DataSource);
    await dataSource.synchronize(true); // CUIDADO em prod/test real
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a project', async () => {
    const res = await request(app.getHttpServer())
      .post('/project')
      .send({
        name: 'Test Project',
        description: 'Descrição',
        startDate: new Date().toDateString(),
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should list all projects', async () => {
    const res = await request(app.getHttpServer()).get('/project');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a task to project and list it', async () => {
    const project = await request(app.getHttpServer())
      .post('/project')
      .send({
        name: 'P2',
        description: 'com tarefa',
        startDate: new Date().toDateString(),
      });

    const task = await request(app.getHttpServer())
      .post(`/project/${project.body.id}/tasks`)
      .send({
        title: 'Minha tarefa',
        description: 'Detalhes',
        dueDate: new Date().toDateString(),
      });

    expect(task.status).toBe(201);

    const list = await request(app.getHttpServer()).get(`/project/${project.body.id}/tasks`);
    expect(list.status).toBe(200);
    expect(list.body.length).toBeGreaterThanOrEqual(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
