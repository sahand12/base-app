import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsTheSameAs(
  property: string,
  validationOptions: ValidationOptions = {},
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTheSameAs',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return `'${propertyName}' must be the same as '${relatedProperty}'`;
        },
      },
    });
  };
}
