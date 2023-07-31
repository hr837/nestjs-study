import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import {
  instanceToInstance,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { PageDataDto } from 'src/appconfig/dto/page-data.dto';

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

  async findAll(): Promise<PageDataDto<Book>> {
    const [rows, total] = await this.booksRepository.findAndCount();
    console.log(rows[0]);
    return {
      rows,
      total,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }
}
