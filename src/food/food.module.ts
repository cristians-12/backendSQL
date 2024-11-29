import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
