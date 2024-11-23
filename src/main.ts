import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';
import CustomFilter from './logging/exception.filter';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf8'),
  );
  SwaggerModule.setup('doc', app, swaggerDocument);
  app.useGlobalFilters(new CustomFilter());
  await app.listen(PORT);
}
bootstrap();
