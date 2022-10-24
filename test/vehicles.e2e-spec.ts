/* eslint-disable immutable/no-let */
/* eslint-disable import/no-extraneous-dependencies */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { VehiclesModule } from '../src/vehicles/vehicles.module';
import { Vehicle } from '../src/vehicles/model/vehicle.entity';
import { StateLog } from '../src/vehicles/model/state-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe.skip('VehiclesController (e2e) tests', () => {
  let app: INestApplication;
  let vehiclesRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        VehiclesModule,
        TypeOrmModule.forRoot({
          database: ':memory:',
          entities: [Vehicle, StateLog],
          logging: true,
          synchronize: true,
          type: 'sqlite',
        })],
    }).compile();

    app = moduleFixture.createNestApplication();
    vehiclesRepository = moduleFixture.get('VehicleRepository');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await vehiclesRepository.query('DELETE FROM vehicles');
  });

  it('/v1/vehicles/1 (GET)', async () => {
    await vehiclesRepository.insert({ id: 1, make: 'Mazda', model: 'Cosmo', state: 'sold' });

    return request(app.getHttpServer())
      .get('/v1/vehicles/1')
      .expect(200);
  });
});
