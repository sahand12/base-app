import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { omit } from 'ramda';
import { addMinutes } from 'date-fns';

import { User, UserRegistrationStatus } from './user.entity';
import { UserDbDto } from './dto/user-db.dto';
import { VerifySignupDto } from '../auth/dto/verify-signup.dto';
import {
  InvalidRegistrationTokenError,
  RegistrationTokenExpiredError,
  UserAlreadyRegisteredError,
  UserNotFoundError,
} from './users.errors';
import { RegistrationMethod, LoginOrSignupDto } from '../auth/dto/login-or-signup.dto';

const REGISTRATION_TOKEN_EXPIRATION_DURATION_MINUTES = 3;
const SALT_ROUNDS = 10;

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async signUp(
    method: 'email' | 'cellphone',
    { cellOrEmail, password }: LoginOrSignupDto,
  ): Promise<User> {
    try {
      const user = new User();
      if (method === 'email') {
        user.email = cellOrEmail;
      } else if (method === 'cellphone') {
        user.cellphone = cellOrEmail;
      }
      user.password = await this.hashPassword(password);
      const { token, expires } = this._generateRegistrationToken();
      user.registrationToken = token;
      user.registrationTokenExpires = expires;
      await user.save();

      return omit(['password'], user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Phone number already exists');
      } else {
        throw err;
      }
    }
  }

  async issueNewRegistrationToken(user: User): Promise<User> {
    const { token, expires } = this._generateRegistrationToken();
    user.registrationToken = token;
    user.registrationTokenExpires = expires;
    await user.save();
    return user;
  }

  async verifySignup(verifySignupDto: VerifySignupDto) {
    const { method, cellphone, email, token } = verifySignupDto;
    let options = {};
    if (method === RegistrationMethod.CELLPHONE) {
      options = Object.assign(options, { cellphone });
    } else if (method === RegistrationMethod.EMAIL) {
      options = Object.assign(options, { email });
    }
    const user = await this.findOne(options);

    // 1. user not found.
    if (user === undefined) {
      throw new UserNotFoundError();
    }

    // 2. User has already been registered.
    if (user.registrationStatus === UserRegistrationStatus.DONE) {
      throw new UserAlreadyRegisteredError();
    }

    // 3. Invalid registration token
    if (user.registrationToken !== token) {
      throw new InvalidRegistrationTokenError();
    }

    // 4. Registration token has expired
    if (user.registrationTokenExpires < new Date()) {
      throw new RegistrationTokenExpiredError();
    }

    user.registrationTokenExpires = null;
    user.registrationToken = null;
    user.registrationStatus = UserRegistrationStatus.DONE;
    if (method === RegistrationMethod.EMAIL) {
      user.emailVerifiedAt = new Date();
    } else if (method === RegistrationMethod.CELLPHONE) {
      user.cellphoneVerifiedAt = new Date();
    }

    await user.save();
    return user;
  }

  /**
   * @returns:
   *  1. No user found --> undefined
   *  2. user with incorrect credentials --> false
   *  3. user with correct credentials --> User
   */
  async validateUser(cellphone: string, pass: string): Promise<UserDbDto | false | undefined> {
    const user = await this.findOne({ cellphone });

    // 1. No user found
    if (user === undefined) {
      return undefined;
    }

    // 3. Everything is ok
    if (await this.comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    // 3. Incorrect credentials
    return false;
  }

  hashPassword(plainPassword): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  comparePassword(plainPassword, hash): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }

  private _generateRegistrationToken() {
    return {
      token: this._randomInt(5).toString(10),
      expires: addMinutes(new Date(), REGISTRATION_TOKEN_EXPIRATION_DURATION_MINUTES),
    };
  }

  private _randomInt(size: number): number {
    const high = 10 ** size;
    const low = 10 ** (size - 1);
    return Math.floor(Math.random() * (high - low) + low);
  }
}

export { UserRepository };
