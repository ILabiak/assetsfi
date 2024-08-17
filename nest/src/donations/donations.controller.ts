import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  userDonations(@User() user) {
    return this.donationsService.userDonations(user.sub);
  }

  @Get('foundations/wallets')
  foundationWallets() {
    return this.donationsService.foundationWallets();
  }

  @Get('foundations')
  foundationsList() {
    return this.donationsService.foundationsList();
  }

  @Post('create')
  create(@Body() createDonationDto: CreateDonationDto, @User() user) {
    return this.donationsService.create(createDonationDto, user.sub);
  }

  @Put('update')
  update(@Body() updateDonationDto: UpdateDonationDto, @User() user) {
    return this.donationsService.update(updateDonationDto, user.sub);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @User() user) {
    return this.donationsService.remove(+id, user.sub);
  }
}
