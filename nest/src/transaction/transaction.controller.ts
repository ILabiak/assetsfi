import {
  Controller,
  Post,
  Put,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user) {
    return this.transactionService.create(createTransactionDto, user.sub);
  }

  @Put()
  update(@Body() updateTransactionDto: UpdateTransactionDto, @User() user) {
    return this.transactionService.update(updateTransactionDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.transactionService.remove(+id, user.sub);
  }
}
