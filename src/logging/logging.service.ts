import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, readdir, stat } from 'fs';
import { resolve } from 'path';
import { consoleLogger, LoggingLevel } from './helpers';

const LOGGING_LEVEL: LoggingLevel = process.env.LOGGING_LEVEL
  ? +process.env.LOGGING_LEVEL
  : 0;

const ROTATION_SIZE = process.env.ROTATION_SIZE
  ? +process.env.ROTATION_SIZE
  : 64;

@Injectable()
export class LoggingService implements LoggerService {
  private dir = resolve('logs');
  private counter = 0;
  private path = resolve(this.dir, 'app0.log');
  private fileSize = 0;

  constructor() {
    readdir(this.dir, (e, f) => {
      if (e) console.error(e.message);
      this.counter = Math.max(...f.map((v) => +v.replace(/[a-z.]/gi, '')), 0);
    });
    this.path = resolve(this.dir, `app${this.counter}.log`);
    stat(this.path, (e, s) => {
      if (e) console.error(e.message);
      this.fileSize = s.size;
    });
  }

  private logTo(message: any, lvl: LoggingLevel) {
    if (lvl > LOGGING_LEVEL) return;
    const c = `timestamp: ${new Date().toUTCString()} | ${message}`;
    const f = c + '\n';
    consoleLogger(c, lvl);
    this.checkSize(f.length);
    appendFile(this.path, f, (e) => {
      if (e) console.error(e);
    });
  }

  private checkSize(increment: number) {
    if (this.fileSize + increment > ROTATION_SIZE * 2 ** 10) {
      this.path = resolve(this.dir, `app${++this.counter}.log`);
      this.fileSize = 0;
    } else {
      this.fileSize += increment;
    }
  }

  subscribeToUncaught() {
    process.on('uncaughtException', (e) => {
      const log = `uncaught exception: ${e.message}`;
      this.logTo(log, LoggingLevel.error);
    });
  }

  subscribeToRejected() {
    process.on('unhandledRejection', (r) => {
      const log = `unhandled rejection: ${
        r instanceof Error ? r.message : JSON.stringify(r)
      }`;
      this.logTo(log, LoggingLevel.error);
    });
  }

  log(message: any) {
    this.logTo(message, LoggingLevel.log);
  }

  fatal(message: any) {
    this.logTo(message, LoggingLevel.error);
  }

  error(message: any) {
    this.logTo(message, LoggingLevel.warn);
  }

  warn(message: any) {
    this.logTo(message, LoggingLevel.warn);
  }
}
