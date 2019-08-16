import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  cleanIRCellphoneNumber,
  isValidIRCellphoneNumber,
} from './helpers/is-valid-IR-cellphone-number';

@Injectable()
export class ParseIRCellphonePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const cleaned = cleanIRCellphoneNumber(value);
    if (!isValidIRCellphoneNumber(cleaned)) {
      throw new BadRequestException(`'${value}' is not a valid IR Phone number`);
    }
    return cleaned;
  }
}
