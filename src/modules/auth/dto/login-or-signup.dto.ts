import { IsNotEmpty, IsIn, MaxLength, MinLength, ValidateIf, IsEmail } from 'class-validator';
import { IsEmailOrIRCellphoneNumber } from '../../../pipes/validators/is-email-or-ir-cellphone-number.validation-decorator';

// @TODO: i18n error messaging
export class LoginOrSignupDto {
  @IsNotEmpty()
  @IsEmailOrIRCellphoneNumber()
  cellOrEmail: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export enum RegistrationMethod {
  CELLPHONE = 'CELLPHONE',
  EMAIL = 'EMAIL',
}
