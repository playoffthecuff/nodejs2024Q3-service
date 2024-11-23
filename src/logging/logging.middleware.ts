import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly service: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const url = `${req.protocol}://${
        req.headers.host + req.originalUrl.split('?')[0]
      }`;
      const params = Object.entries(req.query)
        .map(([k, v]) => `${k} = ${v}`)
        .join(', ');
      const payload = req.body;
      const log = {
        url,
        params,
        payload,
        status: res.statusCode,
      };
      this.service.logToConsole(log);
      this.service.logToFile(log);
    });
    // const url = `${req.protocol}://${req.headers.host + req.originalUrl}`;
    // const params = req.query;
    // const payload = req.body;
    // const log = {
    //   url,
    //   params,
    //   payload,
    //   status: res.status,
    // };
    // this.service.logToConsole(log);
    // this.service.logToFile(log);
    next();
  }
}
