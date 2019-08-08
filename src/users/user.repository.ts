import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from '../auth/dto/signup.dto';

const SALT_ROUNDS = 8;

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async signUp(signupDto: SignupDto) {
    const { cellphone, password: pass } = signupDto;
    const user = new User();
    user.cellphone = cellphone;
    user.password = await this.hashPassword(pass);
    user.email = null;
    user.nickname = '';
    await user.save();
    const { password, ...rest } = user;
    return rest;
  }

  hashPassword(plainPassword): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  comparePassword(plainPassword, hash): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}

export { UserRepository };
