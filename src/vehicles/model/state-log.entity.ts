import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity({ name: 'stateLogs' })
export class StateLog {
  @ManyToOne(() => Vehicle, (i) => i.id)
  public readonly vehicle: Vehicle;

  @PrimaryColumn()
  public readonly state: string;

  @PrimaryColumn()
  public readonly timestamp: Date;
}

