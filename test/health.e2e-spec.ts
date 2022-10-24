/* eslint-disable immutable/no-let */
/* eslint-disable import/no-extraneous-dependencies */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { VehiclesModule } from '../src/vehicles/vehicles.module';
import { HealthModule } from '../src/infrastructure/health/health.module';

describe('VehiclesController (e2e) tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, VehiclesModule, HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/healthz (GET)', () => request(app.getHttpServer())
    .get('/healthz')
    .expect(200));
});
