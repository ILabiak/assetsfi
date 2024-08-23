import { Controller, Get, Body, Put, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto, ChangeUserPasswordDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('metadata')
  getMetadata(@Headers('authorization') authorization: string, @User() user) {
    return this.userService.getMetadata(authorization, user.sub);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto, @User() user) {
    return this.userService.update(updateUserDto, user.sub);
  }

  @Put('changepassword')
  changePassword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.userService.changePassword(changeUserPasswordDto);
  }
}
