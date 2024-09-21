import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // Importing the Users entity from the TypeORM module.forFeature([Users])],  // Importing the Users entity from the TypeORM module.forFeature([Users])],  // Importing the Users entity from the TypeORM module
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporting the UsersService for use in other modules. exports: [UsersService],  // Exporting the UsersService for use in other modules. exports: [UsersService],  // Exporting the UsersService for use in other modules. exports: [UsersService],  // Exporting the UsersService for use in other modules. exports: [UsersService],  // Exporting the UsersService for use in other modules. exports: [UsersService],
})
export class UsersModule {}
