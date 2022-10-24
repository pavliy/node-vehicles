import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Vehicle } from './model/vehicle.entity';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleMapProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Vehicle, VehicleDto);
    };
  }
}
