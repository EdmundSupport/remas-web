import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConsoleColorEnum } from 'shared/log/domain/enum/console_color.enum';

export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.group(ConsoleColorEnum.white, new Date().toLocaleString(), ConsoleColorEnum.green, `[REQUEST]`,  `[${req.method}]`, `[${req.originalUrl}]`);
    console.groupEnd();
    next();
  }
}
