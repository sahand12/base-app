import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(cellphone: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(cellphone, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

export { LocalStrategy };
