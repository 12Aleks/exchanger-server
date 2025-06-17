import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ExchangeModule,
  ],
})
export class AppModule {}
