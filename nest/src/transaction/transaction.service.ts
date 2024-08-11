import { Injectable, HttpException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    if (!createTransactionDto.coinId || !createTransactionDto.portfolioId) {
      throw new HttpException(
        {
          message: 'Not enough data to create transaction',
        },
        400,
      );
    }

    const portfolio = await this.prisma.portfolios.findFirst({
      where: {
        uuid: createTransactionDto.portfolioId,
        userId,
      },
    });

    if (!portfolio) {
      throw new HttpException(
        {
          message:
            'Portfolio Not Found to create transaction of user does not have access to that portfilio',
        },
        400,
      );
    }

    try {
      const transaction = await this.prisma.transactions.create({
        data: {
          portfolioId: portfolio.id,
          coinId: createTransactionDto.coinId,
          date: createTransactionDto.date,
          amount: createTransactionDto.amount,
          fees: createTransactionDto.fees || 0,
          description: createTransactionDto.description,
          originCurrency: createTransactionDto.originCurrency,
          costPerUnitInUsd: createTransactionDto.costPerUnitInUsd,
          costPerUnitInCurrency: createTransactionDto.costPerUnitInCurrency,
        },
      });
      return transaction;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async update(updateTransactionDto: UpdateTransactionDto, userId: string) {
    if (!updateTransactionDto.id || !updateTransactionDto.portfolioId) {
      throw new HttpException(
        {
          message: 'Not enough data to edit transaction',
        },
        400,
      );
    }
    const portfilio = await this.prisma.portfolios
      .findFirstOrThrow({
        where: {
          id: updateTransactionDto.portfolioId,
          userId,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Portfolio Not Found to update transaction or user does not have access to that portfilio',
          400,
        );
      });

    const transaction = await this.prisma.transactions
      .findFirstOrThrow({
        where: {
          portfolioId: portfilio.id,
          id: updateTransactionDto.id,
        },
      })
      .catch((err) => {
        throw new HttpException(err.message, 400);
      });

    const updateTx = await this.prisma.transactions.update({
      where: {
        id: transaction.id,
      },
      data: {
        date: updateTransactionDto.date || transaction.date,
        amount: updateTransactionDto.amount || transaction.amount,
        fees:
          updateTransactionDto.fees !== undefined &&
          updateTransactionDto.fees !== null
            ? updateTransactionDto.fees
            : transaction.fees,
        description:
          updateTransactionDto.description || transaction.description,
        costPerUnitInUsd:
          updateTransactionDto.costPerUnitInUsd || transaction.costPerUnitInUsd,
        costPerUnitInCurrency:
          updateTransactionDto.costPerUnitInCurrency ||
          transaction.costPerUnitInCurrency,
      },
    });
    return updateTx;
  }

  async remove(deleteTransactionDto: UpdateTransactionDto, userId: string) {
    if (!deleteTransactionDto.portfolioId) {
      throw new HttpException("You didn't provide portfolio id.", 400);
    }
    await this.prisma.portfolios
      .findFirstOrThrow({
        where: {
          id: deleteTransactionDto.portfolioId,
          userId,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Portfolio Not Found to update transaction or user does not have access to that portfilio',
          400,
        );
      });
    return this.prisma.transactions.delete({
      where: {
        id: deleteTransactionDto.id,
        portfolioId: deleteTransactionDto.portfolioId,
      },
    });
  }
}
