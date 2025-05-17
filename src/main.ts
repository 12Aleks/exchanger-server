require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/');
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();
