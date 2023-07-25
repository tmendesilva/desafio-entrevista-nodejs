import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TicketDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  company_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  vehicle_id: number;
}
