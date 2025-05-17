import {Injectable} from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";

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
        const rate = await this.exchangeService.getExchangeRate();
        const amountPLN = parseFloat((amountEUR * rate).toFixed(2));
        const transaction: ITransactionService = {
            id: Math.random().toString(36),
            amountEUR,
            amountPLN,
            rate,
            timestamp: new Date().toISOString(),
        };

        this.transActions.push(transaction);

        return transaction;
    }
}
