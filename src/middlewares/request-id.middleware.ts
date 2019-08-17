import * as uuid from 'uuid/v4';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request & {uuid: string}, res: Response, next: NextFunction) {
    req.uuid = uuid();
    return next();
  }
}
