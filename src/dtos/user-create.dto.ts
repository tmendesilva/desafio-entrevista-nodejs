import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import {
  PasswordMessages,
  PasswordValidator,
} from 'src/validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(PasswordValidator.password, {
    message: PasswordMessages.PASSWORD_VALIDATION,
  })
  @ApiProperty()
  password: string;
}
