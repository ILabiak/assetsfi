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
import { TrackingService } from './tracking.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller('tracking')
@UseGuards(AuthGuard('jwt'))
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get()
  userAdresses(@User() user) {
    return this.trackingService.findUserAdresses(user.sub);
  }

  @Get('networks')
  findNetworks() {
    return this.trackingService.findNetworks();
  }

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto, @User() user) {
    return this.trackingService.create(createTrackingDto, user.sub);
  }

  @Put()
  update(@Body() updateTrackingDto: UpdateTrackingDto, @User() user) {
    return this.trackingService.update(updateTrackingDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.trackingService.remove(+id, user.sub);
  }
}
