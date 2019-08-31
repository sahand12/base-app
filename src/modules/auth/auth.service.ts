import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginOrSignupResult, UsersService } from '../users/users.service';
import { UserDbDto } from '../users/dto/user-db.dto';
import { VerifySignupDto } from './dto/verify-signup.dto';
import { LoginOrSignupDto } from './dto/login-or-signup.dto';
import { InvalidLoginOrSignupResult } from '../users/users.errors';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginOrSignup(signupDto: LoginOrSignupDto) {
    const { result, user } = await this.usersService.loginOrSignup(signupDto);

    if (result === LoginOrSignupResult.LOGIN) {
      this._handleLogin(user);
    } else if (result === LoginOrSignupResult.VERIFICATION) {
      this._handleVerification(user);
    } else if (result === LoginOrSignupResult.SIGNUP) {
      this._handleSignup(user);
    } else {
      throw new InvalidLoginOrSignupResult(result);
    }
  }

  private _handleLogin(user: User) {}

  private _handleSignup(user: User) {}

  private _handleVerification(user: User) {}

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

  async verifySignUp(verifySignupDto: VerifySignupDto) {
    return this.usersService.verifySignup(verifySignupDto);
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
