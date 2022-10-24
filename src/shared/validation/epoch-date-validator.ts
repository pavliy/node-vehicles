/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator } from 'class-validator';

export function IsEpochDate(): (object: Object, propertyName: string) => void {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isEpochDate',
      options: { message: `${propertyName} is not in valid epoch date format` },
      propertyName,
      target: object.constructor,
      validator: {
        validate(timestamp: number) {
          return (new Date(timestamp)).getTime() > 0;
        },
      },
    });
  };
}
