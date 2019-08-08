import { IsNotEmpty, Length } from 'class-validator';

class ForgotPasswordDto {
  @IsNotEmpty()
  @Length(10, 11)
  cellphone: string;
}

export { ForgotPasswordDto };
