import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getLog } from './helpers';

@Catch(HttpException)
export default class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const [req, res] = [ctx.getRequest<Request>(), ctx.getResponse<Response>()];
    const status = exception.getStatus();
    const log = getLog(req, res);
    log.status = status;
    res.status(status).json(log);
  }
}
