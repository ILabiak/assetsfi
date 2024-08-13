import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BinanceService } from './binance.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { CreateOrderDto, CancelOrderDto } from './dto/create-order.dto';

@Controller('binance')
@UseGuards(AuthGuard('jwt'))
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('userdata')
  userData(@User() user) {
    return this.binanceService.getUserData(user.sub);
  }

  @Get('trading/permissions')
  tradingPermissions(@User() user) {
    return this.binanceService.getPermissions(user.sub);
  }

  @Get('userorders/:symbol')
  userOrders(@Param('symbol') symbol, @User() user) {
    return this.binanceService.userOrders(symbol, user.sub);
  }

  @Post('create')
  create(@Body() createBinanceDto: CreateBinanceDto, @User() user) {
    return this.binanceService.create(createBinanceDto, user.sub);
  }

  @Post('order/new')
  createOrder(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.binanceService.createOrder(createOrderDto, user.sub);
  }

  @Post('order/cancel')
  cancelOrder(@Body() cancelOrderDto: CancelOrderDto, @User() user) {
    return this.binanceService.cancelOrder(cancelOrderDto, user.sub);
  }

  @Delete('delete')
  remove(@User() user) {
    return this.binanceService.remove(user.sub);
  }
}
