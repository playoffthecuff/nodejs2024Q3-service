import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs';
import { resolve } from 'path';

@Injectable()
export class LoggingService {
  private counter = 0;
  private path = resolve('logs', `app${this.counter}.log`);

  logToConsole(log: string) {
    process.stdout.write(log);
  }

  logToFile(log: string) {
    appendFile(this.path, log, (e) => {
      if (e) console.error(e);
    });
  }
}
