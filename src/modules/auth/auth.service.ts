import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UsersService } from '../users/users.service';
import { UserDbDto } from '../users/dto/user-db.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(user: UserDbDto) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
    // const { cellphone, password } = loginDto;
    // const user: UserDbDto | false | undefined = await this.usersService.logIn(
    //   loginDto,
    // );

    // // 1. No user found || 2. Incorrect credentials
    // if (user === undefined || user === false) {
    //   throw new BadRequestException(
    //     `Incorrect cellphone number (${cellphone}) or incorrect password`,
    //   );
    // }

    // return user;
  }

  async signUp(signupDto: SignupDto) {
    return this.usersService.signUp(signupDto);
  }

  // To be used with passport strategy
  async validateUser(
    cellphone: string,
    pass: string,
  ): Promise<UserDbDto | null> {
    const result = await this.usersService.validateUser(cellphone, pass);

    // 1. Incorrect credentials || 2.No user found
    if (result === false || result === undefined) {
      return null;
    }

    return result;
  }

  private _generatePasswordResetToken(forgotPasswordDto: ForgotPasswordDto) {}
}
