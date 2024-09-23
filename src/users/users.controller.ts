import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Users[]> {
    console.log(request.query);
    return this.userService.findAll();
  }

  @Post()
  addUser(@Req() request: Request): Promise<any> {
    console.log(request.body);
    return this.userService.addUser(request.body);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<Users> {
    return this.userService.deleteUser(userId);
  }
}
