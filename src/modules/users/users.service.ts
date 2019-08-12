import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { UserDbDto } from './dto/user-db.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  signUp(signupDto: SignupDto) {
    return this.userRepository.signUp(signupDto);
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
