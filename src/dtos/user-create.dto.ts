import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import {
  PasswordMessages,
  PasswordValidator,
} from 'src/validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(PasswordValidator.password, {
    message: PasswordMessages.PASSWORD_VALIDATION,
  })
  password: string;
}
