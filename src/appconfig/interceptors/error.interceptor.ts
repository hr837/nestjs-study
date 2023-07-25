import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseData } from 'src/appconfig/response-data.type';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<null>> {
    console.log(context);
    return next
      .handle()
      .pipe(
        catchError((err) => throwError(() => new BadRequestException(err))),
      );
  }
}
