import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface ICachedRate {
  value: number;
  timestamp: number;
}

interface ExchangeRateResponse {
  rate: number;
}

@Injectable()
export class ExchangeService {
  private cache: ICachedRate | null = null;
  private readonly TTL = 60 * 1000;

  constructor(private readonly configService: ConfigService) {}

  async getExchangeRate(): Promise<number> {
    const now = Date.now();
    if (this.cache && now - this.cache.timestamp < this.TTL)
      return this.cache.value;

    const API_URL = this.configService.get<string>('API_URL');
    const API_KEY = this.configService.get<string>('API_KEY');

    const response = await axios.get<ExchangeRateResponse>(`${API_URL}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    const rate = response.data?.rate ?? 4.5;

    this.cache = {
      value: rate,
      timestamp: now,
    };

    return rate;
  }
}
