import { OmitType } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateBookDto extends OmitType(Book, [
  'id',
  'createDate',
  'updateDate',
  'author',
]) {
  @IsNotEmpty()
  @Length(3, 20)
  title: string;

  @IsNotEmpty()
  @Length(5)
  isbn: string;

  @IsOptional()
  @Length(5, 100)
  summary?: string;

  @IsNotEmpty()
  authorId: string;
}
