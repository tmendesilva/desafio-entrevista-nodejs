import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { CnpjValidator } from '../validators/cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @CnpjValidator()
  @ApiProperty()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  car_space_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  motorcycle_space_amount: number;
}
