import { AutoMap } from '@automapper/classes';
import { VehicleState } from './vehicle-state';

export class VehicleDto {
  @AutoMap()
  public readonly id: number;

  @AutoMap()
  public readonly make: string;

  @AutoMap()
  public readonly model: string;

  @AutoMap()
  public readonly state: VehicleState;
}
