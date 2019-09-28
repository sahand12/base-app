import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'ramda';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginOrSignupResult, UsersService } from '../users/users.service';
import { UserDbDto } from '../users/dto/user-db.dto';
import { VerifySignupDto } from './dto/verify-signup.dto';
import { LoginOrSignupDto } from './dto/login-or-signup.dto';
import { InvalidLoginOrSignupResult } from '../users/users.errors';
import { User } from '../users/user.entity';
import { NotificationService } from '../notifications/notification.service';
import { NotificationPurpose } from '../notifications/notification.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private notificationService: NotificationService,
  ) {}

  async loginOrSignup(signupDto: LoginOrSignupDto) {
    const { result, user } = await this.usersService.loginOrSignup(signupDto);
    console.log(result, user);
    return { result, user };

    if (result === LoginOrSignupResult.LOGIN) {
      return this._handleLogin(user);
    }
    if (result === LoginOrSignupResult.NEEDS_VERIFICATION) {
      return this._handleVerification(user);
    }
    if (result === LoginOrSignupResult.SIGNUP) {
      return this._handleSignup(user);
    }
    throw new InvalidLoginOrSignupResult(result);
  }

  // 1. create a token and hand it back to the user. so on the subsequent call we
  // can validate the user based on that.
  private _handleLogin(user: User) {
    return {
      data: {
        user,
      },
    };
  }

  // 1. User has been created but needs to verify its email/cellphone so send
  // the registration token by email/sms/...
  private async _handleSignup(user: User) {
    //     const { info, notification } = await this.notificationService.sendMail(
    //       NotificationPurpose.ACCOUNT_REGISTRATION_CODE,
    //       {
    //         to: user.email,
    //         subject: 'Nahangz.com: Registration Code',
    //         text: `Your code is :${user.registrationToken}`,
    //         html: `
    // <div dir="rtl">
    //   <h1>
    //     <span style="font-size: 20px">کد ثبت نام شما</span>&nbsp;
    //     <span style="font-size: 48px">${user.registrationToken}</span>
    //   </h1>
    // </div>`,
    //       },
    //     );
    //     return {
    //       info,
    //       notification,
    //       action: 'REDIRECT',
    //       data: {
    //         to: '/auth/login/verify',
    //       },
    //     };
  }

  // 1. User is created before but he has not verified his email/sms so send a redirect
  // to verification form and also sends the code via sms/email/...
  private _handleVerification(user: User) {
    return user;
  }

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
  async validateUser(cellphone: string, pass: string): Promise<UserDbDto | null> {
    const result = await this.usersService.validateUser(cellphone, pass);

    // 1. Incorrect credentials || 2.No user found
    if (result === false || result === undefined) {
      return null;
    }

    return result;
  }

  private _generatePasswordResetToken(forgotPasswordDto: ForgotPasswordDto) {}
}
