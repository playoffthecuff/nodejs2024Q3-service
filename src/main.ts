import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';
import CustomFilter from './logging/exception.filter';
import { LoggingService } from './logging/logging.service';

const l = new LoggingService();
l.subscribeToUncaught();
l.subscribeToRejected();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const swaggerDocument = load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf8'),
  );
  SwaggerModule.setup('doc', app, swaggerDocument);
  app.useGlobalFilters(new CustomFilter());
  app.useLogger(app.get(LoggingService));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
