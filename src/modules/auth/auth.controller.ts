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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  logIn(@Request() req) {
    return this.authService.logIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  // @TODO: consider duplicate phone numbers
  @Post('signup')
  signUp(
    @Body(ValidationPipe) signupDto: SignupDto,
    // @Body('cellphone', new ParseIRCellphonePipe())
    // cellphone: string,
  ) {
    // console.log(cellphone);
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
