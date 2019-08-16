import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { IsIRCellphoneNumber } from '../../../pipes/is-IR-cellphone-number';

class LoginDto {
  @IsNotEmpty()
  @IsIRCellphoneNumber()
  cellphone: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export { LoginDto };
