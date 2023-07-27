import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class ServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const resultData = {
      success: false,
      msg: '服务端异常：' + exception.message,
    };
    host.switchToHttp().getResponse<Response>().status(status).json(resultData);
  }
}
