import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/user-create.dto';
import { UpdateUserDto } from 'src/dtos/user-update.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
  }

  async findOneByOrFail(
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
  ) {
    try {
      return await this.userRepository.findOneByOrFail(where);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneByOrFail({ id });
    this.userRepository.merge(user, { name: data.name });
    return await this.userRepository.save(user);
  }

  async destroy(id: number) {
    await this.userRepository.findOneByOrFail({ id });
    this.userRepository.softDelete(id);
  }
}
