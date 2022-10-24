import { Module } from '@nestjs/common';
import { LoggingModule } from './infrastructure/logging/logging.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CachingModule } from './infrastructure/caching/caching.module';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { MappingModule } from './infrastructure/mapping/mapping.module';
import { HealthModule } from './infrastructure/health/health.module';
import { SwaggerDocsModule } from './infrastructure/swagger-docs/swagger-docs.module';

@Module({
  controllers: [],
  imports: [
    LoggingModule,
    VehiclesModule,
    CachingModule,
    PersistenceModule,
    ConfigurationModule,
    MappingModule,
    HealthModule,
    SwaggerDocsModule,
  ],
})
export class AppModule {}
