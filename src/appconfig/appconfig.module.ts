import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mysqlDatabaseConfig from './mysql-database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlDatabaseConfig],
      envFilePath: ['.env.development', '.env'],
    }),
  ],
})
export class AppconfigModule {}
