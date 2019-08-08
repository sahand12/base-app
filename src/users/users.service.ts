import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignupDto } from '../auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  signUp(signupDto: SignupDto) {
    return this.userRepository.signUp(signupDto);
  }

  logIn()
}
