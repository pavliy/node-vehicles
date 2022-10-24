import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationData from './configuration-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationData],
    }),
  ],
})
export class ConfigurationModule {}
