/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */
import { Vehicle } from './vehicle.entity';

describe('VehicleEntity tests', () => {
  let target: Vehicle;

  describe('when adjustStateByDate called', () => {
    it('and timestamp is not defined should return current vehicle state', () => {
      target = new Vehicle();
      target['stateInternal'] = 'current';

      target.adjustStateByDate();

      expect(target.state).toBe('current');
    });

    it.each([
      [new Date('2022-09-12 12:50:41.000000 +00:00'), 'sold'],
      [new Date('2022-09-14 12:41:41.000000 +00:00'), 'sold'],
      [new Date('2022-09-11 23:25:38.000000 +00:00'), 'selling'],
      [new Date('2022-09-11 09:16:45.000000 +00:00'), 'quoted'],
      [new Date('2022-09-10 09:16:45.000000 +00:00'), 'n/a'],
    ])('and stap %s is passed should return %s', (timestamp: Date, expectedState: string) => {
      target = new Vehicle();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target['stateLogs'] = [
        jest.fn().mockReturnValue({
          state: 'quoted',
          timestamp: new Date('2022-09-11 09:11:45.000000 +00:00'),
        })(),
        jest.fn().mockReturnValue({
          state: 'selling',
          timestamp: new Date('2022-09-11 23:21:38.000000 +00:00'),
        })(),
        jest.fn().mockReturnValue({
          state: 'sold',
          timestamp: new Date('2022-09-12 12:41:41.000000 +00:00'),
        })(),
      ];

      target.adjustStateByDate(timestamp);

      expect(target.state).toBe(expectedState);
    });
  });
});
