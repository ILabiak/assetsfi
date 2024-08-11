import { Controller, Post, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user) {
    return this.transactionService.create(createTransactionDto, user.sub);
  }

  @Put('update')
  update(@Body() updateTransactionDto: UpdateTransactionDto, @User() user) {
    return this.transactionService.update(updateTransactionDto, user.sub);
  }

  @Delete('delete')
  remove(@Body() body: any, @User() user) {
    return this.transactionService.remove(body, user.sub);
  }
}
