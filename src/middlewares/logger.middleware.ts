import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as loggerFunc from 'pino';

const pinoLogger = loggerFunc();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { uuid: string }, res: Response, next: NextFunction) {
    console.log(
      new Date().toLocaleString(),
      'requestId: ',
      req.uuid,
      req.method,
      req.url,
    );
    next();
  }
}

export function logger(req, res, next) {
  pinoLogger.info(new Date().toLocaleString(), req.uuid, req.method, req.url);
  return next();
}
