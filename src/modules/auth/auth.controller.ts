import { Body, Controller, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { trim } from 'ramda/';

import { AuthService } from './auth.service';
import { LoggingInterceptor } from '../../interceptors/sample.interceptor';
import { BodyValidationGuard } from '../../guards/body-validation.guard';
import { TransformationPipe } from '../../pipes/transformation.pipe';
import { cleanIRCellphoneNumber } from '../../pipes/helpers/is-valid-IR-cellphone-number';
import { VerifySignupDto } from './dto/verify-signup.dto';
import { LoginOrSignupDto } from './dto/login-or-signup.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(new BodyValidationGuard(LoginOrSignupDto))
  @UsePipes(new TransformationPipe('body', [{ name: 'cellphone', fn: cleanIRCellphoneNumber }]))
  @Post('login')
  loginOrSignup(@Body() body) {
    return this.authService.loginOrSignup(body);
  }

  @UseGuards(new BodyValidationGuard(VerifySignupDto))
  @UsePipes(new TransformationPipe('body', [{ name: 'cellphone', fn: cleanIRCellphoneNumber }]))
  @Post('signup/verify')
  verifySignup(@Body() body) {
    return this.authService.verifySignUp(body);
  }

  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // logIn(@Body() loginDto: LoginDto, @Request() req) {
  //   return this.authService.logIn(req.user);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Post()
  forgotPassword(@Body('cellphone') cellphone) {
    return 'not implemented yet';
    // return this.authService.forgotPassword(cellphone);
  }

  @Post()
  requestNewPassword() {}
}
