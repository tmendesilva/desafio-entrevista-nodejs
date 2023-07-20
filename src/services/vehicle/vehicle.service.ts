import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '../../entities/vehicle.entity';
import { VehicleSchema } from 'src/schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(data: VehicleSchema) {
    return await this.vehicleRepository.save(data);
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOneOrFail(id: number) {
    try {
      return await this.vehicleRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: VehicleSchema) {
    const vehicle = await this.findOneOrFail(id);
    this.vehicleRepository.merge(vehicle, data);
    return await this.vehicleRepository.save(vehicle);
  }

  async delete(id: number) {
    await this.findOneOrFail(id);
    await this.vehicleRepository.softDelete(id);
  }
}
