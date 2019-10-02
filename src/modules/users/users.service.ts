import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'ramda';
import { isEmail } from 'validator';

import { UserRepository } from './user.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { UserDbDto } from './dto/user-db.dto';
import { VerifySignupDto } from '../auth/dto/verify-signup.dto';
import { LoginOrSignupDto } from '../auth/dto/login-or-signup.dto';
import { User, UserRegistrationStatus } from './user.entity';
import { IncorrectUserCredentialsError, InvalidRegistrationMethod } from './users.errors';
import { isValidIRCellphoneNumber } from '../../pipes/helpers/is-valid-IR-cellphone-number';

enum LoginOrSignupResult {
  'SIGNUP' = 'SIGNUP',
  'LOGIN' = 'LOGIN',
  'NEEDS_VERIFICATION' = 'NEEDS_VERIFICATION',
}

type LoginOrSignupMethod = 'email' | 'cellphone';

@Injectable()
class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async loginOrSignup(
    loginOrSignupDto: LoginOrSignupDto,
  ): Promise<{ result: LoginOrSignupResult; user: User; method: LoginOrSignupMethod }> {
    const { cellOrEmail, password } = loginOrSignupDto;
    let method: LoginOrSignupMethod;
    let payload = {};

    if (isValidIRCellphoneNumber(cellOrEmail)) {
      payload = Object.assign(payload, { cellphone: cellOrEmail });
      method = 'cellphone';
    } else if (isEmail(cellOrEmail)) {
      payload = Object.assign(payload, { email: cellOrEmail });
      method = 'email';
    } else {
      throw new InvalidRegistrationMethod(
        `You need to provide either a valid email or a valid ir cellphone number. received: ${cellOrEmail}`,
      );
    }
    const user = await this.userRepository.findOne(payload);

    // 1. No user found, so this is a signup process
    if (user === undefined) {
      return this._signup(method, loginOrSignupDto);
    }

    // 2. a user is found but he is not verified.
    if (user.registrationStatus === UserRegistrationStatus.PENDING_VERIFICATION) {
      return this._newRegistrationToken(method, user);
    }

    // 3. This is a login
    return this._login(method, user, password);
  }

  private async _newRegistrationToken(
    method: LoginOrSignupMethod,
    user: User,
  ): Promise<{ result: LoginOrSignupResult; user: User; method: LoginOrSignupMethod }> {
    const userWithNewToken = await this.userRepository.issueNewRegistrationToken(user);

    return {
      result: LoginOrSignupResult.NEEDS_VERIFICATION,
      user: this.cleanUser(userWithNewToken),
      method,
    };
  }

  private async _signup(
    method,
    loginOrSignupDto: LoginOrSignupDto,
  ): Promise<{ result: LoginOrSignupResult; user: User; method: LoginOrSignupMethod }> {
    const newUser = await this.userRepository.signUp(method, loginOrSignupDto);
    return {
      result: LoginOrSignupResult.SIGNUP,
      user: newUser,
      method,
    };
  }

  private async _login(
    method: LoginOrSignupMethod,
    user: User,
    password: string,
  ): Promise<{ result: LoginOrSignupResult; user: User; method: LoginOrSignupMethod }> {
    const isCredentialsCorrect = await this.userRepository.comparePassword(user.password, password);

    // 1. password is not valid
    if (isCredentialsCorrect === false) {
      throw new IncorrectUserCredentialsError();
    }

    return {
      result: LoginOrSignupResult.LOGIN,
      user: this.cleanUser(user),
      method,
    };
  }

  verifySignup(verifySignupDto: VerifySignupDto) {
    return this.userRepository.verifySignup(verifySignupDto);
  }

  cleanUser(user: User): User {
    return omit(
      [
        'password',
        'passwordResetToken',
        'passwordResetExpires',
        // 'registrationToken',
        'registrationTokenExpires',
      ],
      user,
    );
  }

  logIn(loginDto: LoginDto): Promise<UserDbDto | false | undefined> {
    const { password, cellphone } = loginDto;
    return this.validateUser(cellphone, password);
  }

  async findUser(select: object): Promise<User | undefined> {
    const user = await this.userRepository.findOne(select);
    if (user !== undefined) {
      return omit(['password'], user);
    }
    return undefined;
  }

  validateUser(cellphone: string, pass: string): Promise<UserDbDto | false | undefined> {
    return this.userRepository.validateUser(cellphone, pass);
  }
}

export { LoginOrSignupMethod, LoginOrSignupResult, UsersService };
