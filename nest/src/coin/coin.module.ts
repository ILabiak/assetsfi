import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { PrismaService } from '../prisma.service';
import { CoinController } from './coin.controller';

@Module({
  controllers: [CoinController],
  providers: [CoinService, PrismaService],
})
export class CoinModule {}
