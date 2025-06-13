import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export class BaseException extends HttpException {
    public readonly detail: any;
    public readonly tid: string;
    public readonly version: string;
    public readonly build: string;
    public readonly hostname: string;
    public readonly __line__: string;
    public readonly __function__: string;
    public readonly __file__: string;

    constructor(status: HttpStatus, message: string, detail?: any) {
        super(message, status);

        const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        const isProduction = process.env.NODE_ENV === 'prod';
        const stack = new Error().stack;
        const callerLine = stack?.split('\n')[2] ?? '';

        this.detail = isProduction
            ? detail
            : {
                  ...detail,
                  ...{
                      version: pkg.version,
                      build: pkg.build,
                      hostname: os.hostname(),
                      __line__: callerLine.split(':').reverse()[1] ?? '',
                      __function__: callerLine.split(' ')[5] ?? '',
                      __file__: path.basename(
                          callerLine.split(':')[0].trim().split(' ').pop() ?? '',
                      ),
                      stack: this.stack,
                  },
              };
    }
}
