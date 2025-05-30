import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ExchangeModule } from '../exchange/exchange.module';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [ExchangeModule],
})
export class TransactionModule {}
