import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import {
  instanceToInstance,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { PageDataDto } from 'src/appconfig/dto/page-data.dto';
import { BookQueryDto } from './dto/book-query.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorsRepository.findOneBy({
      id: createBookDto.authorId,
    });
    if (!author) throw new BadRequestException('错误的作者ID');

    const book = plainToInstance(Book, createBookDto);
    book.author = author;
    return await this.booksRepository.save(book);
  }

  async findAll(query: BookQueryDto): Promise<PageDataDto<Book>> {
    // where 条件组合
    const where: FindOptionsWhere<Book>[] = [];
    if (query.title?.trim()) {
      where.push({ title: Like(`%${query.title.trim()}%`) });
    }
    const [rows, total] = await this.booksRepository.findAndCount({
      where,
      skip: query.skip,
      take: query.take,
    });
    return {
      rows,
      total,
    };
  }

  async findOne(id: string) {
    return await this.booksRepository.findOneBy({ id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) throw new BadRequestException('无效的ID');
    if (updateBookDto.authorId) {
      const author = await this.authorsRepository.findOneBy({
        id: updateBookDto.authorId,
      });
      if (!author) throw new BadRequestException('无效的作者ID');
      book.author = author;
    }
    const updateBook = this.booksRepository.merge(book, updateBookDto);
    return await this.booksRepository.save(updateBook);
  }

  async remove(id: string) {
    await this.booksRepository.delete(id);
    const book = await this.booksRepository.findOneBy({ id });
    return !book;
  }
}
