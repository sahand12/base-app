import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { validate } from 'class-validator';

@Injectable()
export class BodyValidationGuard implements CanActivate {
  constructor(private readonly ValidationClass) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const instance = Object.assign(new this.ValidationClass(), body);

    return validate(instance).then(errors => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      return true;
    });
  }
}
