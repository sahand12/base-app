import { ConflictException } from '@nestjs/common';
import { User, UserRegistrationStatus } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserDbDto } from './dto/user-db.dto';
import { VerifySignupDto } from '../auth/dto/verify-signup.dto';
import {
  InvalidRegistrationTokenError,
  RegistrationTokenExpiredError,
  UserAlreadyRegisteredError,
  UserNotFoundError,
} from './users.errors';
import {
  RegistrationMethod,
  LoginOrSignupDto,
} from '../auth/dto/login-or-signup.dto';

const SALT_ROUNDS = 10;

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async signUp(signupDto: LoginOrSignupDto): Promise<UserDbDto> {
    try {
      const user = await this._buildNewUser(signupDto);
      await user.save();

      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Phone number already exists');
      } else {
        throw err;
      }
    }
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
  async validateUser(
    cellphone: string,
    pass: string,
  ): Promise<UserDbDto | false | undefined> {
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

  private async _buildNewUser({ cellphone, password }): Promise<User> {
    const user = new User();
    user.cellphone = cellphone;
    if (password !== null && password !== undefined && password !== '') {
      user.password = await this.hashPassword(password);
    }

    return user;
  }

  hashPassword(plainPassword): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  comparePassword(plainPassword, hash): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}

export { UserRepository };
