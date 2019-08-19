import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { compose, identity } from 'ramda';

interface TransformationRule {
  name: string;
  fns: Function[];
}

export class TransformationPipe implements PipeTransform {
  constructor(
    private readonly type: string,
    private readonly rules: TransformationRule[] = [],
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === this.type) {
      this.rules.forEach(({ name, fns }) => {
        if (value.hasOwnProperty(name)) {
          value[name] = compose(...fns)(value[name]);
        }
      });
    }
    return value;
  }
}
