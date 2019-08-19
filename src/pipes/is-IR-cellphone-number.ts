import { registerDecorator, ValidationArguments } from 'class-validator';
import {
  isValidIRCellphoneNumber,
  cleanIRCellphoneNumber,
} from './helpers/is-valid-IR-cellphone-number';
import { compose } from 'ramda';
import { isUndefined } from './helpers/is-undefined';

export function IsIRCellphoneNumber(validationOptions = {}) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'isIRCellphoneNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isUndefined(value) ? false : isValidIRCellphoneNumber(value);
        },
        defaultMessage(args: ValidationArguments) {
          const input = (args.object as any)[propertyName] || '';
          return `'${input}' is not a valid IR Cellphone number`;
        },
      },
    });
}
