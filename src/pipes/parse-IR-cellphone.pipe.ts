import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIRCellphonePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isValidIRCellphone(value)) {
      throw new BadRequestException('Invalid IR Phone number');
    }
    return cleanIRCellphone(value);
  }
}

function isValidIRCellphone(cellphone: string): boolean {
  if (cellphone.length !== 10) {
    return false;
  }
  const regexp = /^9\d{9}$/;
  return regexp.test(cellphone);
}

function cleanIRCellphone(cellphone: string): string {
  return cellphone
    .trim()
    .replace(/\s/g, '')
    .replace(/^[0۰]/, '')
    .replace(/([۰-۹])/g, function replacer(match, p1) {
      return IrToEn[p1];
    });
}

const IrToEn = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};
