import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { compose, identity } from 'ramda';

interface TransformationRule {
  name: string;
  fn: (value: any, obj?: any) => any;
}

export class TransformationPipe implements PipeTransform {
  constructor(
    private readonly type: string,
    private readonly rules: TransformationRule[] = [],
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === this.type) {
      this.rules.forEach(({ name, fn }) => {
        if (Object.hasOwnProperty.call(value, name)) {
          value[name] = fn(value[name], value);
        }
      });
    }
    return value;
  }
}
