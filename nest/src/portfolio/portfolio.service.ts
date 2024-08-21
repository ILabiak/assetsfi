import { Injectable, HttpException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  calculatePortfolioCoins,
  calculatePortfolioStats,
  calculateAllPortfolios,
} from '../common/utils';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createPortfolioDto: CreatePortfolioDto) {
    return this.prisma.portfolios
      .create({
        data: {
          userId: userId,
          title: createPortfolioDto.name,
          currencyId: createPortfolioDto.currencyId,
        },
      })
      .then((portfolio) => portfolio)
      .catch((error) => {
        throw new HttpException(error, 400);
      });
  }

  async findUserPortfolios(userId: string) {
    try {
      const portfolios = await this.prisma.portfolios.findMany({
        where: {
          userId,
        },
        include: {
          transactions: {
            include: {
              coins: true,
            },
            orderBy: {
              date: 'desc',
            },
          },
          currencies: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!portfolios || portfolios.length === 0) {
        return { portfolios: [] };
      }

      const portfolioData = await Promise.all(
        portfolios.map(async (portfolio) => {
          delete Object.assign(portfolio, {
            ['Transactions']: portfolio['transactions'],
          })['transactions'];
          delete Object.assign(portfolio, {
            ['Currency']: portfolio['currencies'],
          })['currencies'];

          portfolio['Transactions'].map((el) => {
            delete Object.assign(el, {
              ['Coin']: el['coins'],
            })['coins'];
          });
          const portfolioStats = await calculatePortfolioStats(portfolio);
          return portfolioStats;
        }),
      );
      const totalData = await calculateAllPortfolios(portfolioData);

      if (!portfolioData[0]?.uuid) {
        throw new HttpException(
          'Some error while getting portfolios data',
          400,
        );
      }

      return { portfolios: portfolioData, totalData };
    } catch (error) {
      throw new HttpException({ message: error.message }, 400);
    }
  }

  findOne(id: string, userId: string) {
    return this.prisma.portfolios
      .findFirst({
        where: {
          uuid: id,
          userId,
        },
        include: {
          transactions: {
            include: {
              coins: true,
            },
            orderBy: {
              date: 'desc',
            },
          },
          currencies: true,
        },
      })
      .then(async (portfolio) => {
        delete Object.assign(portfolio, {
          ['Transactions']: portfolio['transactions'],
        })['transactions'];
        delete Object.assign(portfolio, {
          ['Currency']: portfolio['currencies'],
        })['currencies'];

        portfolio['Transactions'].map((el) => {
          delete Object.assign(el, {
            ['Coin']: el['coins'],
          })['coins'];
        });
        if (!portfolio) {
          throw new HttpException('Portfolio Not Found', 400);
        }
        const portfolioData = await calculatePortfolioCoins(portfolio);
        return portfolioData;
      });
  }

  async update(updatePortfolioDto: UpdatePortfolioDto, userId: string) {
    const portfolio = await this.prisma.portfolios.findUnique({
      where: {
        uuid: updatePortfolioDto.uuid,
        userId,
      },
    });

    if (!portfolio) {
      throw new HttpException('Portfolio Not Found', 400);
    }

    try {
      const updatedPortfolio = await this.prisma.portfolios.update({
        where: {
          uuid: updatePortfolioDto.uuid,
          userId,
        },
        data: {
          title: updatePortfolioDto.name || portfolio.title,
        },
      });

      return updatedPortfolio;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async remove(id: string, userId: string) {
    try {
      const deleted = await this.prisma.portfolios.delete({
        where: {
          uuid: id,
          userId,
        },
      });
      if (deleted?.id) {
        return { message: 'Portfolio was successfully deleted!' };
      }
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
