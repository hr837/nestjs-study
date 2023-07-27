import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpExceptionBody,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    // 服务器实际的状态码
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const resultData = {
      success: false,
      msg: '请求错误：',
    };
    if (typeof exceptionResponse === 'string') {
      resultData.msg += exceptionResponse;
    } else {
      if ('response' in exceptionResponse) {
        const { message } = (exceptionResponse as any)
          .response as HttpExceptionBody;

        if (Array.isArray(message)) {
          resultData.msg += message.toString();
        } else {
          resultData.msg += message;
        }
      } else {
        resultData.msg += (exceptionResponse as Error).message;
      }
    }
    // 设置新的返回数据
    host.switchToHttp().getResponse<Response>().status(status).json(resultData);
  }
}
