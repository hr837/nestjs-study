import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { type INestApplication } from '@nestjs/common';

/**
 * 使用Swagger
 * @param app
 */
function useSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Locallibrary Toturial')
    .setDescription('图书馆 nestjs 示例')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');
  useSwagger(app);
  await app.listen(3000);
}
bootstrap();
