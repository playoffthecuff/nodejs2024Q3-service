import { Request, Response } from 'express';

export type Log = {
  url: string;
  params: string;
  body: any;
  status: number;
};

export enum LoggingLevel {
  log,
  warn,
  error,
  fatal,
}

export function getLog(req: Request, res: Response, status?: number) {
  let body = '';
  try {
    body = JSON.stringify(req.body ?? {}).replace(/"/g, '');
  } catch (error) {
    console.error(error);
  }
  const log: Log = {
    url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
    params: Object.entries(req.query)
      .map(([k, v]) => `${k} = ${v}`)
      .join(', '),
    body,
    status: status ?? res.statusCode,
  };
  return `url: ${log.url} | params: ${log.params} | body: ${log.body} | status: ${log.status}`;
}

export function consoleLogger(msg: string, level: LoggingLevel) {
  console[LoggingLevel[level]](msg);
}
