import { Global, Logger, Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const customLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('node-vehicles'),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.colorize() }),
  ],
});

@Global()
@Module({
  providers: [
    Logger,
  ],
})
export class LoggingModule {
  public static getLogger(): winston.Logger {
    return customLogger;
  }
}
