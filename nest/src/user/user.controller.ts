import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/metadata')
  getMetadata(@Request() req) {
    return this.userService.getMetadata(
      req.user.sub,
      req.headers.authorization,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    // return this.userService.update(req.user.sub, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
