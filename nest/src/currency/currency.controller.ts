import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('list')
  findAll() {
    return this.currencyService.findAll();
  }

  @Get(':currency')
  findOne(@Param('currency') currency: string) {
    return this.currencyService.findOne(currency);
  }
}
