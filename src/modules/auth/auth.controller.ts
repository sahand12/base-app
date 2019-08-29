import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoggingInterceptor } from '../../interceptors/sample.interceptor';
import { BodyValidationGuard } from '../../guards/body-validation.guard';
import { TransformationPipe } from '../../pipes/transformation.pipe';
import { cleanIRCellphoneNumber } from '../../pipes/helpers/is-valid-IR-cellphone-number';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(new BodyValidationGuard(SignupDto))
  @UsePipes(
    new TransformationPipe('body', [
      { name: 'cellphone', fn: cleanIRCellphoneNumber },
    ]),
  )
  @Post('signup')
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

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
