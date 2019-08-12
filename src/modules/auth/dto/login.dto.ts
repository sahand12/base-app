import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';

class LoginDto {
  @IsNotEmpty()
  @Length(10, 11)
  cellphone: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export { LoginDto };
