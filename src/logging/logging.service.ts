import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs';
import { resolve } from 'path';
import { ErrorLog, formatLog } from './helpers';

const counter = 0;
const path = resolve('logs', `app${counter}.log`);

@Injectable()
export class LoggingService {
  logToConsole(log: string) {
    process.stdout.write(log);
  }

  logToFile(log: string) {
    appendFile(path, log, (e) => {
      if (e) console.error(e);
    });
  }

  static subscribeToUncaught() {
    process.on('uncaughtException', (e) => {
      const l: ErrorLog = {
        timestamp: new Date().toUTCString(),
        message: 'uncaught exception',
        error: e.message,
      };
      const log = formatLog(l);
      process.stdout.write(log);
      appendFile(path, log, (e) => {
        if (e) console.error(e);
      });
      process.exit(1);
    });
  }

  static subscribeToRejected() {
    process.on('unhandledRejection', (r) => {
      const l: ErrorLog = {
        timestamp: new Date().toUTCString(),
        message: 'unhandled rejection',
        error: r instanceof Error ? r.message : JSON.stringify(r),
      };
      const log = formatLog(l);
      process.stdout.write(log);
      appendFile(path, log, (e) => {
        if (e) console.error(e);
      });
      process.exit(1);
    });
  }
}
