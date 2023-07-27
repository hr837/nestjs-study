import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { TypeORMError } from 'typeorm';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<null>> {
    return next.handle().pipe(
      catchError((err: Error) => {
        let newException: HttpException;
        if (err instanceof TypeORMError) {
          newException = new InternalServerErrorException(err);
        }
        return throwError(() => newException ?? err);
        // return throwError(() => new BadRequestException(err));
      }),
    );
  }
}
