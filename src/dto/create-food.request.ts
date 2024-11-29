import { IsNumber, IsString } from 'class-validator';

export class FoodCreateDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
}
