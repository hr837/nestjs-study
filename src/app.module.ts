import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AppconfigModule } from './appconfig/appconfig.module';
import { DatabaseModule } from './database/database.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [AppconfigModule, DatabaseModule, AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
