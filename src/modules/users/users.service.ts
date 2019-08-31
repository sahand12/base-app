import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import { UserRepository } from './user.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { UserDbDto } from './dto/user-db.dto';
import { VerifySignupDto } from '../auth/dto/verify-signup.dto';
import {
  LoginOrSignupDto,
  RegistrationMethod,
} from '../auth/dto/login-or-signup.dto';
import { User, UserRegistrationStatus } from './user.entity';
import {
  IncorrectUserCredentialsError,
  InvalidRegistrationMethod,
} from './users.errors';

const REGISTRATION_TOKEN_EXPIRATION_DURATION_MINUTES = 3;
enum LoginOrSignupResult {
  'SIGNUP' = 'SIGNUP',
  'LOGIN' = 'LOGIN',
  'VERIFICATION' = 'VERIFICATION',
}

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async loginOrSignup(
    loginOrSignupDto: LoginOrSignupDto,
  ): Promise<{ result: LoginOrSignupResult; user: User }> {
    const { method, cellphone, email } = loginOrSignupDto;
    let payload = {};
    if (method === RegistrationMethod.CELLPHONE) {
      payload = Object.assign(payload, { cellphone });
    } else if (method === RegistrationMethod.EMAIL) {
      payload = Object.assign(payload, { email });
    }
    const user = await this.userRepository.findOne(payload);

    // 1. No user found, so this is a signup process
    if (user === undefined) {
      const newUser = await this._signup(loginOrSignupDto);
      return {
        result: LoginOrSignupResult.SIGNUP,
        user: newUser,
      };
    }

    // 2. a user is found but he is not verified.
    if (
      user.registrationStatus === UserRegistrationStatus.PENDING_VERIFICATION
    ) {
      const { token, expires } = this._generateRegistrationToken();
      user.registrationToken = token;
      user.registrationTokenExpires = expires;
      await user.save();

      return {
        result: LoginOrSignupResult.VERIFICATION,
        user,
      };
    }

    // 3. This is a login
    const verifiedUser = await this._login(user, loginOrSignupDto);
    return {
      result: LoginOrSignupResult.LOGIN,
      user: verifiedUser,
    };
  }

  private async _signup(loginOrSignupDto: LoginOrSignupDto): Promise<User> {
    const { method, cellphone, email, password } = loginOrSignupDto;

    const user = new User();
    if (method === RegistrationMethod.CELLPHONE) {
      user.cellphone = cellphone;
    } else if (method === RegistrationMethod.EMAIL) {
      user.email = email;
    } else {
      throw new InvalidRegistrationMethod();
    }
    user.password = await this.userRepository.hashPassword(password);
    const { token, expires } = this._generateRegistrationToken();
    user.registrationToken = token;
    user.registrationTokenExpires = expires;

    await user.save();
    return user;
  }

  private async _login(
    user: User,
    loginOrSignupDto: LoginOrSignupDto,
  ): Promise<User> {
    const { password } = loginOrSignupDto;
    const isCredentialsCorrect = await this.userRepository.comparePassword(
      user.password,
      password,
    );

    // 1. password is not valid
    if (isCredentialsCorrect === false) {
      throw new IncorrectUserCredentialsError();
    }

    return user;
  }

  private _generateRegistrationToken() {
    return {
      token: this._randomInt(5).toString(10),
      expires: addMinutes(
        new Date(),
        REGISTRATION_TOKEN_EXPIRATION_DURATION_MINUTES,
      ),
    };
  }

  private _randomInt(size: number): number {
    const high = 10 ** size;
    const low = 10 ** (size - 1);
    return Math.floor(Math.random() * (high - low) + low);
  }

  verifySignup(verifySignupDto: VerifySignupDto) {
    return this.userRepository.verifySignup(verifySignupDto);
  }

  logIn(loginDto: LoginDto): Promise<UserDbDto | false | undefined> {
    const { password, cellphone } = loginDto;
    return this.validateUser(cellphone, password);
  }

  async findUser(select: object): Promise<UserDbDto | undefined> {
    const user = await this.userRepository.findOne(select);
    if (user !== undefined) {
      const { password, ...ret } = user;
      return ret;
    }
    return undefined;
  }

  validateUser(
    cellphone: string,
    pass: string,
  ): Promise<UserDbDto | false | undefined> {
    return this.userRepository.validateUser(cellphone, pass);
  }
}

export { LoginOrSignupResult, UsersService };
