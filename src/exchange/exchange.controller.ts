import {Body, Controller, Get, Post} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { RatesNBP } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  async getRates(): Promise<{ tradingDate: string; rates: RatesNBP[] }> {
    return this.exchangeService.getExchangeRates();
  }

  @Post('history')
  async getHistoryRates(@Body('date') date: number){
    return this.exchangeService.getHistoryRates(date);
  }

  @Post('gold')
  async getGoldRates(@Body('date') date: number){
    return this.exchangeService.getGoldRates(date);
  }
}
