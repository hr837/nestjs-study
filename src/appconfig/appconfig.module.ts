import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import mysqlDatabaseConfig from './mysql-database.config';
// import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BadRequestFilter } from './filters/bad-request.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlDatabaseConfig],
      envFilePath: ['.env.development', '.env'],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          transform: true,
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppconfigModule {}
