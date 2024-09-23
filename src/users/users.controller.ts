import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Users } from './users.entity';
import { UserCreateDto } from './dto/create-user.request';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Users[]> {
    console.log(request.query);
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() newUser: UserCreateDto): Promise<Users> {
    console.log(newUser);
    return this.userService.addUser(newUser);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<Users> {
    return this.userService.deleteUser(userId);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<Users> {
    return this.userService.findUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UserCreateDto,
  ): Promise<Users> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
