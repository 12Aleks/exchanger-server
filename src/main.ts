import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const CLIENT_URL = configService.get<string>('CLIENT_URL');
  const PORT = configService.get<number>('PORT') ?? 5000;

  app.setGlobalPrefix('/');
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
