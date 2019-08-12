import { BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from '../auth/dto/signup.dto';
import { UserDbDto } from './dto/user-db.dto';

const SALT_ROUNDS = 8;

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async signUp(signupDto: SignupDto): Promise<UserDbDto> {
    try {
      const { cellphone, password: pass, repeatPassword } = signupDto;

      const user = new User();
      user.cellphone = cellphone;
      user.password = await this.hashPassword(pass);
      user.email = null;
      user.nickname = '';
      await user.save();

      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      if (err.code === '23505') {
        const error = new BadRequestException('Duplicate phone number');
        throw error;
      } else {
        throw err;
      }
    }
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

  hashPassword(plainPassword): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  comparePassword(plainPassword, hash): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}

export { UserRepository };
