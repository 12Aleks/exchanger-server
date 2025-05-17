import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ExchangeModule, TransactionModule],
})
export class AppModule {}
