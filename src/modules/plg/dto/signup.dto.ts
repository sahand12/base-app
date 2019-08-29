import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsIRCellphoneNumber } from '../../../pipes/validators/is-ir-cellphone-number.validation-decorator';
import { IsTheSameAs } from '../../../pipes/validators/is-the-same-as.validation-decorator';

export class SignupDto {
  @ValidateIf(o => o.method === 'SMS')
  @IsNotEmpty()
  @IsIRCellphoneNumber()
  cellphone: string;

  @ValidateIf(o => o.method === 'EMAIL')
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsNotEmpty()
  @IsTheSameAs('password')
  passwordRepeat: string;

  @IsIn(['EMAIL', 'SMS', 'GOOGLE', 'INSTAGRAM'])
  method: string;
}
