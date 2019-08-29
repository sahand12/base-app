import { IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsIRCellphoneNumber } from '../../../pipes/validators/is-ir-cellphone-number.validation-decorator';

class LoginDto {
  @IsNotEmpty()
  @IsIRCellphoneNumber()
  cellphone: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsNotEmpty()
  @IsIn(['EMAIL', 'CELLPHONE', 'GOOGLE', 'INSTAGRAM'], {
    message: 'Invalid authentication method.',
  })
  method: string;
}

export { LoginDto };
