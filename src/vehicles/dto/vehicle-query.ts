import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsEpochDate } from '../../shared/validation/epoch-date-validator';

export class VehicleQuery {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsEpochDate()
  @Type(() => Number)
  public readonly stateTimestamp: Date | undefined;
}
