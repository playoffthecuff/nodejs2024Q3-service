import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile } from 'fs';
import { resolve } from 'path';
import { ConsoleLevel, consoleLogger } from './helpers';

const LOGGING_LEVEL = process.env.LOGGING_LEVEL
  ? +process.env.LOGGING_LEVEL
  : 0;

['log', 'warn', 'error'];

@Injectable()
export class LoggingService implements LoggerService {
  private counter = 0;
  private path = resolve('logs', `app${this.counter}.log`);

  private logTo(message: any, lvl: ConsoleLevel) {
    const c = `timestamp: ${new Date().toUTCString()} | ${message}`;
    const f = c + '\n';
    consoleLogger(c, lvl);
    appendFile(this.path, f, (e) => {
      if (e) console.error(e);
    });
  }

  subscribeToUncaught() {
    process.on('uncaughtException', (e) => {
      if (LOGGING_LEVEL > 2) return;
      const log = `uncaught exception: ${e.message}`;
      this.error(log);
    });
  }

  subscribeToRejected() {
    process.on('unhandledRejection', (r) => {
      if (LOGGING_LEVEL > 2) return;
      const log = `unhandled rejection: ${
        r instanceof Error ? r.message : JSON.stringify(r)
      }`;
      this.error(log);
    });
  }

  log(message: any) {
    this.logTo(message, 'log');
  }

  fatal(message: any) {
    if (LOGGING_LEVEL > 2) return;
    this.logTo(message, 'error');
  }

  error(message: any) {
    if (LOGGING_LEVEL > 1) return;
    this.logTo(message, 'warn');
  }

  warn(message: any) {
    if (LOGGING_LEVEL > 0) return;
    this.logTo(message, 'warn');
  }
}
