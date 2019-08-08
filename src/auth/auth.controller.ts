import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {AuthService} from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  logIn(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }

  @Post()
  signUp(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post()
  forgotPassword(@Body('cellphone') cellphone) {
    return this.authService.forgotPassword(cellphone);
  }

  @Post()
  requestNewPassword() {}
}
