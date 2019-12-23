import { ValidationError } from '@nestjs/common';

export function hasErrors(name: string, errors: ValidationError[] = []) {
  return errors.some(error => error.property === name);
}
