import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../../model/vehicle.entity';
import { VehicleNotFoundException } from '../../errors/vehicle-not-found-exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { VehicleDto } from '../../dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  public constructor(
    @InjectRepository(Vehicle) private readonly vehiclesRepository: Repository<Vehicle>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  public async getVehicle(id: number, timestamp?: Date): Promise<VehicleDto> {
    const foundVehicle = await this.vehiclesRepository.findOne({ relations: ['stateLogs'], where: { id } });

    if (!foundVehicle) {
      throw new VehicleNotFoundException();
    }

    foundVehicle.adjustStateByDate(timestamp);

    return this.mapper.map(foundVehicle, Vehicle, VehicleDto);
  }
}
