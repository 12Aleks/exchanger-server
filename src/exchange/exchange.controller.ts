import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { RatesNBP } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  async getRates(): Promise<{ tradingDate: string; rates: RatesNBP[] }> {
    return this.exchangeService.getExchangeRates();
  }

  @Get('history')
  async getHistoryRates(){
    return this.exchangeService.getHistoryRates();
  }

  @Get('gold')
  async getGoldRates(){
    return this.exchangeService.getGoldRates();
  }
}
