import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketDto } from 'src/dtos/ticket.dto';
import { CompanyEntity } from 'src/entities/company.entity';
import { TicketEntity } from 'src/entities/ticket.entity';
import { Repository } from 'typeorm';
import { VehicleService } from '../vehicle/vehicle.service';
import { CompanyService } from '../company/company.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    private readonly vehicleService: VehicleService,
    private readonly companyService: CompanyService,
  ) {}

  async create(data: TicketDto) {
    await this.validateIfVehicleIsAlreadyParked(data);
    await this.validateIfParkingLotHasAvailableSpots(data);
    return await this.ticketRepository.save({
      ...data,
      datetime_entry: new Date(),
    });
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOneByOrFail(id: number) {
    try {
      return await this.ticketRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async exit(id: number) {
    const ticket = await this.findOneByOrFail(id);
    this.ticketRepository.merge(ticket, { datetime_exit: new Date() });
    return await this.ticketRepository.save(ticket);
  }

  private getTotalSpaceAmount(company: CompanyEntity, vehicleType: string) {
    switch (vehicleType) {
      case 'car':
        return company.car_space_amount;
      case 'motorcicle':
        return company.motorcycle_space_amount;
    }
    return 0;
  }

  private async validateIfVehicleIsAlreadyParked(data: TicketDto) {
    const vehicleParked = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where(
        'ticket.company_id = :companyId AND ticket.vehicle_id = :vehicleId AND ticket.datetime_exit IS NULL',
        {
          companyId: data.company_id,
          vehicleId: data.vehicle_id,
        },
      )
      .getOne();

    if (vehicleParked) {
      throw new ConflictException(`Vehicle is already parked`);
    }
  }

  private async validateIfParkingLotHasAvailableSpots(data: TicketDto) {
    const company = await this.companyService.findOneByOrFail(data.company_id);
    const vehicle = await this.vehicleService.findOneByOrFail(data.vehicle_id);
    const totalSpaceAmount = this.getTotalSpaceAmount(company, vehicle.type);

    const totalVehicleParked = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.vehicle', 'vehicle')
      .where(
        'ticket.company_id = :companyId AND vehicle.type = :vehicleType AND ticket.datetime_exit IS NULL',
        {
          companyId: company.id,
          vehicleType: vehicle.type,
        },
      )
      .getCount();

    if (totalVehicleParked >= totalSpaceAmount) {
      throw new ConflictException(
        `Parking has no available ${vehicle.type} spots for company ${company.name}`,
      );
    }
  }
}
