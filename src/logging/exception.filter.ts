import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getLog } from './helpers';

@Catch(HttpException)
export default class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const [req, res] = [ctx.getRequest<Request>(), ctx.getResponse<Response>()];
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const log = getLog(req, res, status);
    res.status(status).json(log);
  }
}
