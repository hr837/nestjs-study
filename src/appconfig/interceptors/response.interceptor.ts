import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseData } from 'src/appconfig/response-data.type';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    return next.handle().pipe(
      map((r) => {
        const resultData: ResponseData<any> = {
          success: true,
          data: r,
          msg: 'success',
        };
        return resultData;
      }),
    );
  }
}
