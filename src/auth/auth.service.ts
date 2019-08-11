import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDbDto } from '../users/dto/user-db.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  logIn(loginDto: LoginDto) {
    return 'not implemented yet';
  }

  async signUp(signupDto: SignupDto) {
    return this.usersService.signUp(signupDto);
  }

  async validateUser(
    cellphone: string,
    pass: string,
  ): Promise<UserDbDto | null> {
    const result = await this.usersService.validateUser(cellphone, pass);

    // 1. Incorrect credentials || 2.No user found
    if (result === false || result === undefined) {
      return null;
    }

    return result;
  }

  private _generatePasswordResetToken(forgotPasswordDto: ForgotPasswordDto) {}
}
