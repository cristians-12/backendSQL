import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCreateDto } from 'src/dto/create-food.request';
import { Like, Repository } from 'typeorm';
import { Food } from './food.entity';
import { ErrorHandler } from '@nestjs/common/interfaces';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
  ) {}

  findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findByQuery(query: {
    name?: string;
    price?: number;
    id?: number;
  }): Promise<{ message: string; data?: Food | Food[]; error?: ErrorHandler }> {
    try {
      const whereConditions: any = {};

      if (query.name) {
        whereConditions.name = Like(`%${query.name}%`);
      }
      if (query.price) {
        whereConditions.price = query.price;
      }
      if (query.id) {
        whereConditions.id = query.id;
      }

      const foods = await this.foodRepository.find({
        where: whereConditions,
      });

      if (foods.length === 0) {
        return {
          message:
            'No se encontraron comidas con los criterios proporcionados.',
        };
      }

      return { message: 'Comidas encontradas', data: foods };
    } catch (error) {
      return {
        message: 'Hubo un error al realizar la búsqueda.',
        error: error.message,
      };
    }
  }

  async create(dataBody: FoodCreateDto): Promise<{
    message: string;
    result?: Food;
    error?: ErrorHandler;
    success: boolean;
  }> {
    try {
      const foodName = dataBody.name;
      const foodPrice = dataBody.price;

      if (foodPrice <= 0 || foodPrice > 100000)
        return { message: 'Valor de comida no valido.', success: false };

      if (this.foodRepository.findOne({ where: { name: foodName } }))
        return { message: 'Esa comida ya existe.', success: false };

      const newFood: FoodCreateDto = {
        name:
          foodName.charAt(0).toUpperCase() + foodName.slice(1, foodName.length),
        price: foodPrice,
      };

      const result = await this.foodRepository.save(newFood);
      return { message: 'Comida agregada exitosamente', success: true };
    } catch (error) {
      return {
        message: 'No se pudo agregar comida',
        error: error.message,
        success: false,
      };
    }
  }

  async delete(query: {
    name?: string;
    id?: number;
  }): Promise<{ success: boolean; error?: ErrorHandler; message: string }> {
    try {
      const whereConditions: any = {};

      if (query.name) {
        whereConditions.name = Like(`%${query.name}%`);
      }
      if (query.id) {
        whereConditions.id = query.id;
      }

      const foodToDelete = await this.foodRepository.findOne({
        where: whereConditions,
      });

      const response = this.foodRepository.delete(foodToDelete);

      if (!response)
        return { message: 'No se pudo eliminar la comida ', success: false };

      return { success: true, message: 'Comida eliminada.' };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Error eliminando',
      };
    }
  }
}
