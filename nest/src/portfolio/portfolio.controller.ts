import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  HttpCode,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
@UseGuards(AuthGuard('jwt'))
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  create(@Body() createPortfolioDto: CreatePortfolioDto, @User() user) {
    return this.portfolioService.create(user.sub, createPortfolioDto);
  }

  @Get('data')
  findUserPortfolios(@User() user) {
    return this.portfolioService.findUserPortfolios(user.sub);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @User() user) {
    return this.portfolioService.findOne(uuid, user.sub);
  }

  @Put('update')
  update(@Body() UpdatePortfolioDto: UpdatePortfolioDto, @User() user) {
    return this.portfolioService.update(UpdatePortfolioDto, user.sub);
  }

  @Post('delete')
  @HttpCode(200)
  remove(@Body() body, @User() user) {
    return this.portfolioService.remove(body.uuid, user.sub);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portfolioService.remove(+id);
  // }
}
