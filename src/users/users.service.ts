import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.request';
import { ErrorHandler } from '@nestjs/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findUser(userId: string): Promise<Users | any> {
    const result = await this.userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!result) return { message: 'User not found' };

    return result;
  }

  async addUser(user: UserCreateDto): Promise<{
    message: string;
    result?: UserCreateDto;
    error?: ErrorHandler;
  }> {
    try {
      const result = await this.userRepository.save(user);
      return { message: 'Usuario agregado correctamente', result };
    } catch (error) {
      return { message: 'No se pudo agregar al usuario', error: error.message };
    }
  }

  async deleteUser(id: string): Promise<any> {
    const result = await this.userRepository.delete({ id: parseInt(id) });
    if (result.affected > 0) {
      return { message: 'Usuario eliminado correctamente' };
    } else {
      return { message: 'No se ha encontrado el usuario' };
    }
  }

  async updateUser(id: string, user: UserCreateDto): Promise<Users> {
    let userToUpdate = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    let updated = Object.assign(userToUpdate, user);
    return this.userRepository.save(updated);
  }
}
