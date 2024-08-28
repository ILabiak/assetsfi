import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { coins } from '@prisma/client';

@Injectable()
export class CoinService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<coins[]> {
    return this.prisma.coins.findMany();
  }
}
