import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'vehicleTypeValidatorConstraint' })
export class vehicleTypeValidatorConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string): boolean {
    return ['car', 'motorcicle'].includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    const { property, value } = args;
    return `${property} ${
      value || ''
    } is invalid. Use 'car' or 'motorcycle' only.`;
  }
}

export function VehicleTypeValidator(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: vehicleTypeValidatorConstraint,
    });
  };
}
