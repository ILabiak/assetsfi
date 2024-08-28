import { Injectable, HttpException } from '@nestjs/common';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { CreateOrderDto, CancelOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import NodeRSA from 'node-rsa';
import {
  getUserInformation,
  checkTradePermissions,
  getUserOrders,
  checkKeys,
  createOrder,
  cancelOrder,
} from '../common/utils';

@Injectable()
export class BinanceService {
  constructor(private prisma: PrismaService) {}

  async getKeys(userId: string) {
    const binanceKeys = await this.prisma.bnKeys.findFirst({
      where: {
        userId,
      },
    });
    if (!binanceKeys) {
      return {};
    }
    const privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64',
    ).toString('ascii');
    const key = new NodeRSA(privateKey, 'private');
    const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
    const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
    return { apiKey, apiSecret, isTestnet: binanceKeys.isTestnet };
  }

  async getUserData(userId: string) {
    const { apiKey, apiSecret, isTestnet } = await this.getKeys(userId);
    // console.log({ apiKey, apiSecret, isTestnet })
    const result: any = await getUserInformation(apiKey, apiSecret, isTestnet);
    // return 1;
    if (result.totalValue) {
      return result;
    }
    throw new HttpException(
      {
        message: result,
      },
      400,
    );
  }

  async getPermissions(userId: string) {
    const binanceKeys = await this.prisma.bnKeys.findFirst({
      where: {
        userId,
      },
    });
    if (!binanceKeys) {
      throw new HttpException(
        {
          message: 'Keys not found',
        },
        400,
      );
    }
    if (binanceKeys.isTestnet) {
      return 'Trading allowed';
    }
    const privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64',
    ).toString('ascii');
    const key = new NodeRSA(privateKey, 'private');
    const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
    const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
    const result = await checkTradePermissions(apiKey, apiSecret);
    if (result.err) {
      throw new HttpException(
        {
          message: result.err,
        },
        400,
      );
    }
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          message: result,
        },
        400,
      );
    }
  }

  async userOrders(symbol: string, userId: string) {
    if (!symbol) {
      throw new HttpException(
        {
          message: 'No symbol specified',
        },
        400,
      );
    }
    const { apiKey, apiSecret, isTestnet } = await this.getKeys(userId);
    const result = await getUserOrders(apiKey, apiSecret, isTestnet, symbol);
    if (result.err) {
      throw new HttpException(
        {
          message: result.err,
        },
        400,
      );
    }
    return result;
  }

  async create(createBinanceDto: CreateBinanceDto, userId: string) {
    const privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64',
    ).toString('ascii');

    const key = new NodeRSA(privateKey, 'private');
    let apiKey, apiSecret;

    try {
      apiKey = key.decrypt(createBinanceDto.apiKey, 'utf8');
      apiSecret = key.decrypt(createBinanceDto.apiSecret, 'utf8');
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          message: err.message,
        },
        400,
      );
    }

    try {
      const client = checkKeys(apiKey, apiSecret, createBinanceDto.isTestnet);
      await client.account();
      createBinanceDto.userId = userId;
      const bnKeys = await this.prisma.bnKeys.create({
        data: createBinanceDto,
      });
      return bnKeys;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          { error: 'Error while adding keys to database', details: error },
          400,
        );
      }
      throw new HttpException(
        { error: 'Api keys are not valid', details: error },
        400,
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const { apiKey, apiSecret, isTestnet } = await this.getKeys(userId);
    let options;
    if (createOrderDto.type == 'LIMIT') {
      options = {
        price: createOrderDto.price,
        quantity: parseFloat(createOrderDto.quantity),
        timeInForce: 'GTC',
      };
    } else if (createOrderDto.type == 'MARKET') {
      options = {
        quoteOrderQty: createOrderDto.usdtQuantity,
      };
    } else {
      throw new HttpException(
        {
          message: 'Wrong order type',
        },
        400,
      );
    }
    const order = await createOrder(
      apiKey,
      apiSecret,
      isTestnet,
      createOrderDto.symbol,
      createOrderDto.type,
      createOrderDto.side,
      options,
    );
    if (order.err) {
      throw new HttpException(
        {
          message: order.err,
        },
        400,
      );
    }
    return order;
  }

  async cancelOrder(cancelOrderDto: CancelOrderDto, userId: string) {
    const { apiKey, apiSecret, isTestnet } = await this.getKeys(userId);
    const canceled = await cancelOrder(
      apiKey,
      apiSecret,
      isTestnet,
      cancelOrderDto.symbol,
      cancelOrderDto.orderId,
    );
    if (typeof canceled === 'object' && canceled.err) {
      console.log(canceled);
      throw new HttpException(
        {
          message: canceled.err,
        },
        400,
      );
    }
    return canceled;
  }

  remove(userId: string) {
    try {
      return this.prisma.bnKeys.delete({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        400,
      );
    }
  }
}
