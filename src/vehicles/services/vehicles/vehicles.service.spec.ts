import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MappingModule } from '../../../infrastructure/mapping/mapping.module';
import { VehicleState } from '../../dto/vehicle-state';
import { Vehicle } from '../../model/vehicle.entity';
import { VehicleMapProfile } from '../../vehicle-map-profile';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService tests', () => {
  let service: VehiclesService;
  let vehiclesRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ MappingModule],
      providers: [VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useClass: Repository,
        },
        VehicleMapProfile],
    }).compile();

    vehiclesRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    service = module.get<VehiclesService>(VehiclesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('when vehicle not found should throw not found error', async () => {
    jest.spyOn(vehiclesRepository, 'findOne').mockResolvedValue(null);

    await expect(service.getVehicle(1)).rejects.toThrow('Vehicle not found');
  });

  describe('when vehicle found', () => {
    const adjustStateSpy = jest.fn();
    const fakeDate = new Date(2022, 10, 10);
    const fakeVehicle = jest.fn().mockReturnValue({
      adjustStateByDate: adjustStateSpy,
      id: 1,
      make: 'Mazda',
      model: 'Cosmo',
      state: 'sold',
    })() as unknown as Vehicle;

    it('should call adjust state method and return valid vehicle', async () => {
      jest.spyOn(vehiclesRepository, 'findOne').mockResolvedValue(fakeVehicle);

      await service.getVehicle(1, fakeDate);

      expect(adjustStateSpy).toBeCalledWith(fakeDate);
    });

    it('when vehicle found should return valid dto in response', async () => {
      jest.spyOn(vehiclesRepository, 'findOne').mockResolvedValue(fakeVehicle);
      const vehicleData = await service.getVehicle(1, fakeDate);

      expect(vehicleData).toEqual({
        id: fakeVehicle.id,
        make: fakeVehicle.make,
        model: fakeVehicle.model,
        state: fakeVehicle.state as unknown as VehicleState,
      });
    });
  });
});
