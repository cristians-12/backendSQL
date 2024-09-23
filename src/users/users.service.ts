import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async addUser(user: UserCreateDto): Promise<any> {
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
}
