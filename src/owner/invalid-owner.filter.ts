import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { VIEWS_OWNER_CREATE_OR_UPDATE_FORM } from './constants';

@Catch(BadRequestException)
export class InvalidOwnerFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.render(VIEWS_OWNER_CREATE_OR_UPDATE_FORM, {
      errors: exception.message,
    });
  }
}
