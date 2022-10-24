import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerDocsModule {
  public static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Vehicles API')
      .setDescription('Vehicles API description')
      .setVersion('1.0')
      .addTag('vehicles')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }
}
