import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.currencies.findMany();
  }

  async findOne(currency: string) {
    const requestUrl = `https://api.currencybeacon.com/v1/latest?base=usd&symbols=${currency}&api_key=${process.env.BEACON_API}`;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    if (responseJSON?.rates) {
      return {
        rate: responseJSON.rates[currency.toUpperCase()] || 0,
      };
    }
    throw new HttpException(
      {
        message: 'Could not parse exchange rate',
      },
      400,
    );
  }
}
