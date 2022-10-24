import { HttpException, HttpStatus } from '@nestjs/common';

export class VehicleNotFoundException extends HttpException {
  public constructor() {
    super('Vehicle not found', HttpStatus.NOT_FOUND);
  }
}
