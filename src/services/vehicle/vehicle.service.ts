import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDto } from 'src/dtos/vehicle.dto';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../../entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(data: VehicleDto) {
    return await this.vehicleRepository.save(data);
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOneByOrFail(id: number) {
    try {
      return await this.vehicleRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: VehicleDto) {
    const vehicle = await this.findOneByOrFail(id);
    this.vehicleRepository.merge(vehicle, data);
    return await this.vehicleRepository.save(vehicle);
  }

  async delete(id: number) {
    await this.findOneByOrFail(id);
    await this.vehicleRepository.softDelete(id);
  }
}
