import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AppconfigModule } from './appconfig/appconfig.module';
import { DatabaseModule } from './database/database.module';
import { AuthorsModule } from './modules/authors/authors.module';

@Module({
  imports: [AppconfigModule, DatabaseModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
