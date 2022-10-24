import { CacheInterceptor,
  Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { VehicleQuery } from './dto/vehicle-query';
import { VehicleDto } from './dto/vehicle.dto';
import { VehiclesService } from './services/vehicles/vehicles.service';

@Controller({ path: 'vehicles', version: '1' })
export class VehiclesController {
  public constructor(private readonly vehiclesService: VehiclesService) {
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  public async getByIdWithTimestamp(@Param('id', ParseIntPipe) id: number,
    @Query() query: VehicleQuery): Promise<VehicleDto> {
    const foundVehicle = await this.vehiclesService.getVehicle(id, query.stateTimestamp);

    return foundVehicle;
  }
}
