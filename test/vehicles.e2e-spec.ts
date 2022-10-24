/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable dot-notation */
/* eslint-disable functional/immutable-data */
/* eslint-disable immutable/no-let */
/* eslint-disable import/no-extraneous-dependencies */

// eslint-disable-next-line
require('dotenv').config({ path: '.e2e.env' });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Vehicle } from '../src/vehicles/model/vehicle.entity';
import { StateLog } from '../src/vehicles/model/state-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('VehiclesController (e2e) tests', () => {
  const testVehicle = new Vehicle();
  let app: INestApplication;
  let vehiclesRepository: Repository<Vehicle>;

  beforeEach(async () => {
    /* @ts-ignore */
    testVehicle['stateInternal'] = 'sold';
    /* @ts-ignore */
    testVehicle['make'] = 'Mazda';
    /* @ts-ignore */
    testVehicle['model'] = 'Cosmo';
    /* @ts-ignore */
    testVehicle['id'] = 1;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
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
    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });
    vehiclesRepository = moduleFixture.get('VehicleRepository');
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  afterEach(async () => {
    await vehiclesRepository.query('DELETE FROM vehicles');
  });

  it('vehicles cache', async () => {
    const findSpy = jest.spyOn(vehiclesRepository, 'findOne');

    await vehiclesRepository.insert(testVehicle);
    await request(app.getHttpServer()).get('/v1/vehicles/1').expect(200);
    await new Promise((r) => setTimeout(r, 2000));

    await request(app.getHttpServer()).get('/v1/vehicles/1').expect(200);

    await new Promise((r) => setTimeout(r, 3000));
    await request(app.getHttpServer()).get('/v1/vehicles/1').expect(200);

    expect(findSpy).toBeCalledTimes(2);
  }, 7000);

  it('/v1/vehicles/1 (GET)', async () => {
    await vehiclesRepository.insert(testVehicle);

    const response = await request(app.getHttpServer()).get('/v1/vehicles/1').expect(200);

    expect(response.body).toEqual({
      id: 1,
      make: testVehicle.make,
      model: testVehicle.model,
      state: testVehicle.state,
    });
  });
});
