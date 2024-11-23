import { Request, Response } from 'express';

export type Log = {
  timestamp: string;
  url: string;
  params: string;
  payload: any;
  status: number;
};

export function getLog(req: Request, res: Response): Log {
  const url = `${req.protocol}://${
    req.headers.host + req.originalUrl.split('?')[0]
  }`;
  const params = Object.entries(req.query)
    .map(([k, v]) => `${k} = ${v}`)
    .join(', ');
  const payload = req.body;
  return {
    timestamp: new Date().toUTCString(),
    url,
    params,
    payload,
    status: res.statusCode,
  };
}

export function formatLog(log: Log) {
  try {
    return JSON.stringify(log, null, 2).replace(/^{|}$|"/g, '');
  } catch (error) {
    console.error(error);
    return '';
  }
}
