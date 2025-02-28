import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { VehicleTypeValidator } from '../validators/vehicle.validator';

export class VehicleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  brand: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  model: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  color: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  plate: string;

  @IsNotEmpty()
  @IsString()
  @VehicleTypeValidator()
  @ApiProperty()
  type: string;
}
