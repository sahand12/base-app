import {
  IsNotEmpty,
  IsOptional,
  IsIn,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsTheSameAs } from '../../../pipes/is-the-same-as.validation-decorator';
import {ParseIRCellphonePipe} from '../../../pipes/parse-IR-cellphone.pipe';
import {Transform} from 'class-transformer';

enum SignUpBy {
  EMAIL = 'EMAIL',
  CELLPHONE = 'CELLPHONE',
}

// @TODO: i18n error messaging
class SignupDto {
  @IsNotEmpty()
  @Length(10, 11)
  cellphone: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsNotEmpty()
  @IsTheSameAs('password', {
    // message: 'کلمه عبور و تکرار کلمه عبور باید یکسان باشند',
  })
  repeatPassword: string;

  @IsOptional()
  @IsIn(['CELLPHONE', 'EMAIL'])
  by: string;
}

export { SignupDto };
