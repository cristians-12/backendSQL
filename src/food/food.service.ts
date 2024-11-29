import { Injectable } from '@nestjs/common';
import { FoodCreateDto } from 'src/dto/create-food.request';

@Injectable()
export class FoodService {
  private readonly foods: FoodCreateDto[] = [];
  findAll(): FoodCreateDto[] {
    return this.foods;
  }

  create(food: FoodCreateDto): FoodCreateDto {
    this.foods.push(food);
    return food;
  }
}
