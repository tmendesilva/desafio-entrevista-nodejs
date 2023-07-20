import { IsString, MaxLength } from 'class-validator';

export class VehicleSchema {
  @IsString()
  @MaxLength(150)
  brand: string;

  @IsString()
  @MaxLength(150)
  model: string;

  @IsString()
  @MaxLength(50)
  color: string;

  @IsString()
  @MaxLength(20)
  plate: string;

  @IsString()
  @MaxLength(30)
  type: string;
}
