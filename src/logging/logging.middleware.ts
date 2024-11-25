import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getLog } from './helpers';

export type Log = {
  url: string;
  params: string;
  body: any;
  status: number;
};

export type ErrorLog = {
  message: 'uncaught exception' | 'unhandled rejection';
  error: string;
};

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const log = getLog(req, res);
      this.logger[
        ['', 'log', 'log', 'warn', 'warn', 'error'][~~(res.statusCode / 100)]
      ](log);
    });
    next();
  }
}
