import { Body, Controller, Get, Post } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { FoodCreateDto } from 'src/dto/create-food.request';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  async findAllFoods() {
    return this.foodService.findAll();
  }

  @Post()
  async createFood(@Body() food: Food): Promise<FoodCreateDto> {
    return this.foodService.create(food);
  }
}
