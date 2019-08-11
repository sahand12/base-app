import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDbDto } from '../users/dto/user-db.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(cellphone: string, pass: string): Promise<UserDbDto> {
    const user = await this.authService.validateUser(cellphone, pass);
    if (user === null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
