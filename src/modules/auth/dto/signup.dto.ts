import {
  IsNotEmpty,
  IsIn,
  MaxLength,
  MinLength,
  ValidateIf,
  IsEmail,
} from 'class-validator';
import { IsTheSameAs } from '../../../pipes/validators/is-the-same-as.validation-decorator';
import { IsIRCellphoneNumber } from '../../../pipes/validators/is-ir-cellphone-number.validation-decorator';

// @TODO: i18n error messaging
export class SignupDto {
  @ValidateIf(o => o.method === 'CELLPHONE')
  @IsNotEmpty()
  @IsIRCellphoneNumber()
  cellphone: string;

  @ValidateIf(o => o.method === 'EMAIL')
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsNotEmpty()
  @IsTheSameAs('password')
  passRepeat: string;

  @IsIn(['CELLPHONE', 'EMAIL'], {
    message: 'Invalid authentication method',
  })
  method: string;
}

export enum RegistrationMethod {
  CELLPHONE = 'CELLPHONE',
  EMAIL = 'EMAIL',
}
