/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateLog } from '../../vehicles/model/state-log.entity';
import { Vehicle } from '../../vehicles/model/vehicle.entity';
import { DatabaseConfig } from '../configuration/model';

@Module({})
export class PersistenceModule {
  public static register(): DynamicModule {
    return {
      exports: [PersistenceModule],
      imports:
        process.env.MODE === 'e2e'
          ? []
          : [
              TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const databaseConfig = configService.get<DatabaseConfig>('database')!;

                  return {
                    database: databaseConfig.name,
                    entities: [Vehicle, StateLog],
                    host: databaseConfig.host,
                    password: databaseConfig.password,
                    port: databaseConfig.port,
                    type: 'postgres',
                    username: databaseConfig.userName,
                  };
                },
              }),
            ],
      module: PersistenceModule,
      providers: [ConfigService],
    };
  }
}
