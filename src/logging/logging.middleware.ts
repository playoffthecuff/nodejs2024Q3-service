import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';
import { formatLog, getLog } from './helpers';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly service: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const log = formatLog(getLog(req, res));
      this.service.logToConsole(log);
      this.service.logToFile(log);
    });
    next();
  }
}
