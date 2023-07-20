import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCNPJ } from 'validation-br/dist';

@ValidatorConstraint({ name: 'cnpjValidatorConstraint' })
export class CnpjValidatorConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return isCNPJ(value);
  }

  defaultMessage(args: ValidationArguments) {
    const { property, value } = args;
    return `${property} ${value || ''} is invalid.`;
  }
}

export function CnpjValidator(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CnpjValidatorConstraint,
    });
  };
}
