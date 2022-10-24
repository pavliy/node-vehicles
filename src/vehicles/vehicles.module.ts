import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './model/vehicle.entity';
import { VehiclesService } from './services/vehicles/vehicles.service';
import { VehicleMapProfile } from './vehicle-map-profile';
import { VehiclesController } from './vehicles.controller';

@Module({
  controllers: [VehiclesController],
  exports: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehiclesService, Logger, VehicleMapProfile],
})
export class VehiclesModule {}
