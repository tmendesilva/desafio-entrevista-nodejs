import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from 'src/entities/vehicle.entity';
import { VehicleService } from 'src/services/vehicle/vehicle.service';
import { VehicleController } from 'src/controllers/vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
