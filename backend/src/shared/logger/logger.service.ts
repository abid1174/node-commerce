import { Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports } from 'winston';
import { RequestContextDto } from '../request-context';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()],
    });
  }

  error(
    ctx: RequestContextDto,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.error({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  warn(
    ctx: RequestContextDto,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.warn({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  debug(
    ctx: RequestContextDto,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.debug({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  verbose(
    ctx: RequestContextDto,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.verbose({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }

  log(
    ctx: RequestContextDto,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();

    return this.logger.info({
      message,
      contextName: this.context,
      ctx,
      timestamp,
      ...meta,
    });
  }
}
