import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StateLog } from './state-log.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  // eslint-disable-next-line functional/prefer-readonly-type
  @Column({ name: 'state' })
  private stateInternal: string;

  @PrimaryGeneratedColumn()
  @AutoMap()
  public readonly id: number;

  @Column()
  @AutoMap()
  public readonly make: string;

  @Column()
  @AutoMap()
  public readonly model: string;

  @OneToMany(() => StateLog, (stateLog) => stateLog.vehicle)
  public readonly stateLogs?: readonly StateLog[];

  @AutoMap()
  public get state(): string {
    return this.stateInternal;
  }

  public adjustStateByDate(timestamp?: Date): void {
    if (timestamp) {
      // eslint-disable-next-line functional/immutable-data
      this.stateInternal = this.stateLogs?.filter((log) => log.timestamp <= timestamp).pop()?.state ?? 'n/a';
    }
  }
}
