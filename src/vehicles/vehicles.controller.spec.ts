import { CacheInterceptor } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VehicleState } from './dto/vehicle-state';
import { Vehicle } from './model/vehicle.entity';
import { VehiclesService } from './services/vehicles/vehicles.service';
import { VehiclesController } from './vehicles.controller';

describe('VehiclesController tests', () => {
  let controller: VehiclesController;
  const vehiclesService = jest.fn();
  const getVehicleMock = jest.fn();

  beforeEach(async () => {
    vehiclesService.mockReturnValue({
      getVehicle: getVehicleMock,
    });
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [{
        provide: VehiclesService,
        useClass: vehiclesService,
      }],
    }).overrideInterceptor(CacheInterceptor)
      .useClass(jest.fn())
      .compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('when service returned vehicle should return it from controller', async () => {
    const fakeVehicle = jest.fn().mockReturnValue({
      id: 1,
      make: 'Mazda',
      model: 'Cosmo',
      state: VehicleState.Sold,
    })() as unknown as Vehicle;

    getVehicleMock.mockResolvedValue(fakeVehicle);
    const foundVehicle = await controller.getByIdWithTimestamp(1, { stateTimeStamp: undefined });

    expect(foundVehicle).toBe(fakeVehicle);
  });
});
