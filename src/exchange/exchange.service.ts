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

  async getExchangeRates(): Promise<{ tradingDate: string; rates: RatesNBP[]; previousRates: RatesNBP[] }> {
    const now = Date.now();

    if (this.cache && now - this.cache.timestamp < this.TTL) {
      return {
        tradingDate: this.cache.tradingDate,
        rates: this.cache.value,
        previousRates: await this.getYesterdayRates(),
      };
    }

    const API_NBP_RATE = this.configService.get<string>('API_NBP_RATE');

    if (!API_NBP_RATE) {
      throw new Error('API_NBP_RATE is not defined in the configuration');
    }

    const response = await axios.get<ExchangeRateResponse[]>(API_NBP_RATE);
    const table = response.data[0];

    if (!table || !table.rates?.length) throw new Error('Invalid exchange rate data');

    const previousRates = await this.getYesterdayRates();
    table.rates.pop();

    this.cache = {
      value: table.rates,
      timestamp: now,
      tradingDate: table.tradingDate,
    };

    return {
      tradingDate: table.tradingDate,
      rates: table.rates,
      previousRates,
    };
  }


  async getYesterdayRates(): Promise<RatesNBP[]> {
    function subtractWeekdays(date: Date, daysToSubtract: number): Date {
      let daysSubtracted = 0;
      while (daysSubtracted < daysToSubtract) {
        date.setDate(date.getDate() - 1);
        const day = date.getDay();
        if (day !== 0 && day !== 6) {
          daysSubtracted++;
        }
      }
      return date;
    }

    const date = new Date();
    const result = subtractWeekdays(new Date(date), 1);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    const formattedDate = formatDate(result);

    const API_NBP_RATE_YESTERDAY = this.configService.get<string>('API_NBP_RATE_YESTERDAY');
    if (!API_NBP_RATE_YESTERDAY) {
      throw new Error('API_NBP_RATE_YESTERDAY not defined');
    }

    try {
      const response = await axios.get<ExchangeRateResponse[]>(`${API_NBP_RATE_YESTERDAY}/${formattedDate}?format=json`);
      return response.data[0]?.rates || [];
    } catch (error) {
      return [];
    }
  }


  async getHistoryRates(date: number): Promise<RatesNBP[]> {
    const endDate = new Date();
    const startDate = new Date();
    console.log(date)
    startDate.setDate(endDate.getDate() - date);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const API_NBP_HISTORY_RATE = this.configService.get<string>('API_NBP_HISTORY_RATE');
    if (!API_NBP_HISTORY_RATE) {
      throw new Error('API_NBP_HISTORY_RATE is not defined in the configuration');
    }

    try {
      const response = await axios.get(`${API_NBP_HISTORY_RATE}/${formatDate(startDate)}/${formatDate(endDate)}/`);
      return response.data;
    } catch (err: any) {
      console.error('Error API NBP:', err?.response?.data || err.message);
      throw new Error('Not to get data');
    }
  }

async getGoldRates(date: number){
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - date);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const API_NBP_GOLD = this.configService.get<string>('API_NBP_GOLD');
  if (!API_NBP_GOLD) {
    throw new Error('API_NBP_GOLD is not defined in the configuration');
  }

  try {
  const response = await axios.get(`${API_NBP_GOLD}/${formatDate(startDate)}/${formatDate(endDate)}/`);
  return response.data
  } catch (err: any) {
    console.error('Error API NBP:', err?.response?.data || err.message);
    throw new Error('Not to get data');
  }
}
}

