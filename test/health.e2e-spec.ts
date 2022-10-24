/* eslint-disable immutable/no-let */
/* eslint-disable import/no-extraneous-dependencies */

// eslint-disable-next-line
require('dotenv').config({ path: '.e2e.env' });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { VehiclesModule } from '../src/vehicles/vehicles.module';
import { HealthModule } from '../src/infrastructure/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateLog } from '../src/vehicles/model/state-log.entity';
import { Vehicle } from '../src/vehicles/model/vehicle.entity';

describe('VehiclesController (e2e) tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        VehiclesModule,
        HealthModule,
        TypeOrmModule.forRoot({
          database: ':memory:',
          entities: [Vehicle, StateLog],
          logging: false,
          synchronize: true,
          type: 'sqlite',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('/healthz (GET)', () => request(app.getHttpServer()).get('/healthz').expect(200));
});
