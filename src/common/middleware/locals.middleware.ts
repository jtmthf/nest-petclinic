import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as helpers from '../helpers';

@Injectable()
export class LocalsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    res.locals.h = helpers;
    res.locals.currentPath = req.path;
    next();
  }
}
