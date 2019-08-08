import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  logIn(loginDto: LoginDto) {}

  signUp(signupDto: SignupDto) {}

  generatePasswordResetToken(forgotPasswordDto: ForgotPasswordDto) {}


}
