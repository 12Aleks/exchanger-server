import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async simulateTransaction(@Body() dto: TransactionDto) {
    return this.transactionService.createTransaction(dto.amountEUR);
  }
}
