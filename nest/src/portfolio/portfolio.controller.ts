import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PortfolioService } from './portfolio.service';
// import { CreatePortfolioDto } from './dto/create-portfolio.dto';
// import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
@UseGuards(AuthGuard('jwt'))
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  create(@Request() req) {
    console.log(req);
    return this.portfolioService.create(req.user.sub, req.body);
  }

  @Get('data')
  findUserPortfolios(@Request() req) {
    return this.portfolioService.findUserPortfolios(req.user.sub);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @Request() req) {
    return this.portfolioService.findOne(uuid, req.user.sub);
  }

  @Put('update')
  update(@Request() req) {
    return this.portfolioService.update(req.body, req.user.sub);
  }

  @Post('delete')
  @HttpCode(200)
  remove(@Request() req) {
    return this.portfolioService.remove(req.body.uuid, req.user.sub);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portfolioService.remove(+id);
  // }
}
