import { registerAs } from '@nestjs/config';
import { InjectKey_database } from './constant';
import type { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';

/** 数据库配置 */
export default registerAs<MysqlConnectionCredentialsOptions>(
  InjectKey_database,
  () => ({
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
);
