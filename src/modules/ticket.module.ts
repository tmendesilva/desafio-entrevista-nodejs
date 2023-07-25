import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from 'src/entities/ticket.entity';
import { TicketService } from 'src/services/ticket/ticket.service';
import { TicketController } from 'src/controllers/ticket.controller';
import { CompanyService } from 'src/services/company/company.service';
import { VehicleService } from 'src/services/vehicle/vehicle.service';
import { CompanyEntity } from 'src/entities/company.entity';
import { VehicleEntity } from 'src/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity, CompanyEntity, VehicleEntity]),
  ],
  providers: [TicketService, CompanyService, VehicleService],
  controllers: [TicketController],
})
export class TicketModule {}
