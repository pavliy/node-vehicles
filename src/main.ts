import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingModule } from './infrastructure/logging/logging.module';
import { SwaggerDocsModule } from './infrastructure/swagger-docs/swagger-docs.module';

const logger = LoggingModule.getLogger();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const port = app.get<ConfigService>(ConfigService).get<number>('port')!;

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  SwaggerDocsModule.setup(app);

  await app.listen(port).then(() => {
    logger.info(`Service listening on port: ${port}`);
  });
}

void bootstrap();
