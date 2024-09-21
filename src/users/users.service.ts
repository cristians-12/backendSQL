import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async addUser(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }
}
