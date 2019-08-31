import {
  IsNotEmpty,
  IsIn,
  MaxLength,
  MinLength,
  ValidateIf,
  IsEmail,
} from 'class-validator';
import { IsIRCellphoneNumber } from '../../../pipes/validators/is-ir-cellphone-number.validation-decorator';

// @TODO: i18n error messaging
export class LoginOrSignupDto {
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

  @IsIn(['CELLPHONE', 'EMAIL'], {
    message: 'Invalid authentication method',
  })
  method: string;
}

export enum RegistrationMethod {
  CELLPHONE = 'CELLPHONE',
  EMAIL = 'EMAIL',
}
