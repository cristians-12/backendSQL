import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { FoodCreateDto } from 'src/dto/create-food.request';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  async findById(
    @Query('id') id: number,
    @Query('name') name: string,
    @Query('price') price: number,
  ) {
    return this.foodService.findByQuery({ name, price, id });
  }
  // @Get()
  // async findAllFoods() {
  //   return this.foodService.findAll();
  // }

  @Post()
  async createFood(@Body() food: FoodCreateDto) {
    return this.foodService.create(food);
  }

  @Delete()
  async deleteFood(@Query('name') name: string, @Query('id') id: number) {
    return this.foodService.delete({ name, id });
  }
}
