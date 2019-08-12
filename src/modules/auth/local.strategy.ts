import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDbDto } from '../users/dto/user-db.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Configure passport-local with our specific input names in the front-end.
    super({
      usernameField: 'cellphone',
      passwordField: 'password',
    });
  }

  // Passport will call this function with the following signature:
  //   validate(cellphone: string, password: string): any
  // If a user is found and the credentials are valid, the user is returned so Passport
  // can complete its tasks (e.g., creating the `user` property on the `Request` object)
  // and the request pipeline can continue. If it's not found, we throw an exception and
  // let our `exceptions layer` handle it.
  //
  // Typically, the only significant difference in the 'validate()' method for each strategy
  // is how you determine if a user exists and is valid.
  async validate(cellphone: string, pass: string): Promise<UserDbDto> {
    const user = await this.authService.validateUser(cellphone, pass);
    if (user === null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
