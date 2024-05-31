import { Controller, Get } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get()
  findAll() {
    return this.coinService.findAll();
  }
}
