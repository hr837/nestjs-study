import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { AppconfigModule } from 'src/appconfig/appconfig.module';

@Module({
  imports: [
    AppconfigModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
