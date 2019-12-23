import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export interface DigitsOptions {
  /**
   * maximum number of integral digits accepted for this number
   */
  integer: number;
  /**
   * maximum number of fractional digits accepted for this number
   */
  fraction: number;
}

export function Digits(
  options: DigitsOptions,
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) =>
    registerDecorator({
      name: 'digits',
      target: object.constructor,
      propertyName,
      constraints: [options],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [{ integer, fraction }] = args.constraints as [DigitsOptions];

          if (integer < 0) {
            throw new Error('Invalid length for integer');
          }
          if (fraction < 0) {
            throw new Error('Invalid length for fraction');
          }

          if (value === null || value === undefined) {
            return true;
          }

          if (typeof value !== 'number') {
            return false;
          }

          const [
            integerPart = '',
            fractionalPart = '',
          ] = value.toString().split('.');

          return (
            integerPart.length === integer && fractionalPart.length === fraction
          );
        },
      },
    });
}
