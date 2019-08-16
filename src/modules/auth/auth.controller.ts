import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ParseIRCellphonePipe } from '../../pipes/parse-IR-cellphone.pipe';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  logIn(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.logIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UsePipes(ValidationPipe)
  @Post('signup')
  signUp(
    @Body() signupDto: SignupDto,
    @Body('cellphone', ParseIRCellphonePipe)
    cellphone: string,
  ) {
    // return { ...signupDto, cellphone };
    return this.authService.signUp({ ...signupDto, cellphone });
  }

  @Post()
  forgotPassword(@Body('cellphone') cellphone) {
    return 'not implemented yet';
    // return this.authService.forgotPassword(cellphone);
  }

  @Post()
  requestNewPassword() {}
}
