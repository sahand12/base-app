import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole();
  }
}

// build a guard based on ajv for validation and skip pipes completely
// or maybe just for a transformation purpose

// Guards can be controller-scoped, method-scoped, or global-scoped.
// `UseGuards()` may take a single argument, or a comma-separated list of arguments.
// This lets you easily apply the appropriate set of guards with one declaration

// Nest provides the ability to attach custom metadata to route handlers through the
// `@SetMetadata()` decorator. This metadata supplies our missing role data, which a smart guard
// needs to make decisions.
// @Post()
// @SetMetadata('roles', ['admin'])
// async create(@Body() createCatDto: CreateCatDto) {
//   this.catsService.create(createCatDto);
// }
