import {Injectable} from '@nestjs/common';
import axios from 'axios';

export interface ICachedRate {
    value: number;
    timestamp: number;
}
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

@Injectable()
export class ExchangeService {
    private cache: ICachedRate | null = null;
    private readonly TTL = 60 * 1000;

    async getExchangeRate(): Promise<number> {
        const now = Date.now();
        if (this.cache && now - this.cache.timestamp < this.TTL) return this.cache.value;

        const response = await axios.get(`${API_URL}`, {
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
