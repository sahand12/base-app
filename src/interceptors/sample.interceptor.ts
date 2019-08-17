// Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented
// Programming technique. They make it possible to:
// 1. bind extra logic before/after method execution
// 2. transform the result returned from a function
// 3. transform the exception thrown from a function
// 4. extend the basic function behavior.
// 5. completely override a function depending on specific conditions (e.g., for caching purposes)

// use interceptor to log user interaction (storing user calls, asynchronously dispatching evnets
// or calculating a timestamp)
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('...before');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
