import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';

export interface ITransactionService {
  id: string;
  amountEUR: number;
  amountPLN: number;
  rate: number;
  timestamp: string;
}

@Injectable()
export class TransactionService {
  constructor(private readonly exchangeService: ExchangeService) {}
  private transActions: ITransactionService[] = [];

  async createTransaction(amountEUR: number): Promise<ITransactionService> {
    // const rates = await this.exchangeService.getExchangeRates();
    // const amountPLN = parseFloat((amountEUR * rates).toFixed(2));
    const transaction: ITransactionService = {
      id: Math.random().toString(36),
      amountEUR: 10,
      amountPLN: 10,
      rate: 10,
      timestamp: new Date().toISOString(),
    };

    this.transActions.push(transaction);

    return transaction;
  }
}
