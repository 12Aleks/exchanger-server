import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface RatesNBP {
  currency: string;
  code: string;
  bid: number;
  ask: number;
}

export interface ExchangeRateResponse {
  table: string;
  no: string;
  tradingDate: string;
  effectiveDate: string;
  rates: RatesNBP[];
}

export interface ICachedRates {
  value: RatesNBP[];
  timestamp: number;
  tradingDate: string;
}

@Injectable()
export class ExchangeService {
  private cache: ICachedRates | null = null;
  private readonly TTL = 60 * 1000; // 1 minute

  constructor(private readonly configService: ConfigService) {}

  async getExchangeRates(): Promise<{ tradingDate: string; rates: RatesNBP[] }> {
    const now = Date.now();

    if (this.cache && now - this.cache.timestamp < this.TTL) {
      return {
        tradingDate: this.cache.tradingDate,
        rates: this.cache.value,
      };
    }

    const API_NBP_RATE = this.configService.get<string>('API_NBP_RATE');
    if (!API_NBP_RATE) {
      throw new Error('API_NBP_RATE is not defined in the configuration');
    }

    const response = await axios.get<ExchangeRateResponse[]>(API_NBP_RATE);
    const table = response.data[0];

    if (!table || !table.rates?.length) {
      throw new Error('Invalid exchange rate data');
    }

    this.cache = {
      value: table.rates,
      timestamp: now,
      tradingDate: table.tradingDate,
    };

    return {
      tradingDate: table.tradingDate,
      rates: table.rates,
    };
  }



  async getHistoryRates(){
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const API_NBP_HISTORY_RATE = this.configService.get<string>('API_NBP_HISTORY_RATE');
    if (!API_NBP_HISTORY_RATE) {
      throw new Error('API_NBP_HISTORY_RATE is not defined in the configuration');
    }

    const response = await axios.get(`${API_NBP_HISTORY_RATE}/${formatDate(startDate)}/${formatDate(endDate)}/`);
    return response.data

  }

async getGoldRates(){
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const API_NBP_GOLD = this.configService.get<string>('API_NBP_GOLD');
  if (!API_NBP_GOLD) {
    throw new Error('API_NBP_GOLD is not defined in the configuration');
  }

  const response = await axios.get(`${API_NBP_GOLD}/${formatDate(startDate)}/${formatDate(endDate)}/`);
  return response.data

}

}

