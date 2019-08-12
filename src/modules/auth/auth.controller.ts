import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // logIn(@Body(ValidationPipe) loginDto: LoginDto) {
  logIn(@Request() req) {
    return this.authService.logIn(req.user);
  }

  // @TODO: consider duplicate phone numbers
  @Post('signup')
  signUp(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post()
  forgotPassword(@Body('cellphone') cellphone) {
    return 'not implemented yet';
    // return this.authService.forgotPassword(cellphone);
  }

  @Post()
  requestNewPassword() {}
}
