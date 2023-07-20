import { IsNumber, IsString, MaxLength } from 'class-validator';
import { CnpjValidator } from '../validators/cnpj.validator';

export class CompanySchema {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @CnpjValidator()
  cnpj: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNumber()
  car_space_amount: number;

  @IsNumber()
  motorcycle_space_amount: number;
}
