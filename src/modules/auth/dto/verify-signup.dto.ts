import { IsEmail, IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { IsIRCellphoneNumber } from '../../../pipes/validators/is-ir-cellphone-number.validation-decorator';

export class VerifySignupDto {
  @ValidateIf(o => o.method === 'CELLPHONE')
  @IsNotEmpty()
  @IsIRCellphoneNumber()
  cellphone: string;

  @ValidateIf(o => o.method === 'EMAIL')
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty() token: string;

  @IsIn(['CELLPHONE', 'EMAIL', 'GOOGLE', 'INSTAGRAM'], {
    message: 'Invalid authentication method',
  })
  method: string;
}
