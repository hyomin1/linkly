import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = app.get(ConfigService);
  const frontendUrl = config.get<string>('FRONTEND_URL');

  app.enableCors({
    origin: ['http://localhost:5173', frontendUrl],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
