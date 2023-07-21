import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { InjectKey_database } from 'src/appconfig/app.constant';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private databaseConfig: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const dbConfig = await this.databaseConfig.get(InjectKey_database);
    return {
      type: 'mysql',
      ...dbConfig,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
