import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs';
import { resolve } from 'path';

@Injectable()
export class LoggingService {
  private counter = 0;
  private path = resolve('logs', `app${this.counter}.log`);

  logToConsole(m: any) {
    console.table(m);
  }

  logToFile(m: any) {
    let s: string;
    try {
      s = JSON.stringify(m, null, 2).replace(/^{|}$|"/g, '');
    } catch (error) {
      console.error(error);
    }
    appendFile(this.path, s, (e) => {
      if (e) console.error(e);
    });
  }
}
