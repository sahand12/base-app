import { registerDecorator, ValidationArguments, Validator } from 'class-validator';
import { isValidIRCellphoneNumber } from '../helpers/is-valid-IR-cellphone-number';
import { compose } from 'ramda';

const validator = new Validator();

export function IsEmailOrIRCellphoneNumber(validationOptions = {}) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'isEmailOrIRCellphoneNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validator.isEmail(value) || isValidIRCellphoneNumber(value);
        },
        defaultMessage(args: ValidationArguments) {
          const input = (args.object as any)[propertyName] || '';
          return `'${input}' is not a valid IR Cellphone number`;
        },
      },
    });
}
