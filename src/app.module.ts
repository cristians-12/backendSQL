import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FoodController } from './food/food.controller';
import { FoodService } from './food/food.service';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'tutorial',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    FoodModule,
  ],
  controllers: [AppController, FoodController],
  providers: [AppService, FoodService],
})
export class AppModule {}
