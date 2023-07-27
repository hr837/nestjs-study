import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { AuthorQueryDto } from './dto/author-query.dto';
import { PageDataDto } from '../../appconfig/dto/page-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    this.checkDate(createAuthorDto.dateOfBirth, createAuthorDto.dateOfDeath);
    const author = plainToInstance(Author, createAuthorDto);
    await this.authorsRepository.save(author);
    return author;
  }

  async findAll(query: AuthorQueryDto): Promise<PageDataDto<Author>> {
    // where 条件组合
    const nameWhere: FindOptionsWhere<Author>[] = [];
    if (query.name?.trim()) {
      const nameOperator = Like(`%${query.name.trim()}%`);
      nameWhere.push({ firstName: nameOperator }, { familyName: nameOperator });
    }
    const [rows, total] = await this.authorsRepository.findAndCount({
      where: [...nameWhere],
      skip: query.skip,
      take: query.take,
    });

    return {
      rows,
      total,
    };
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorsRepository.findOneBy({ id });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsRepository.findOneByOrFail({ id });
    const mergedAuthor = this.authorsRepository.merge(author, updateAuthorDto);
    this.checkDate(mergedAuthor.dateOfBirth, mergedAuthor.dateOfDeath);
    return await this.authorsRepository.save(mergedAuthor);
  }

  async remove(id: string) {
    await this.authorsRepository.delete(id);
    const author = await this.authorsRepository.findOneBy({ id });
    return !author;
  }

  /** 检查作者的日期-死亡日期不能早于出生日期 */
  checkDate(birthDate?: Date, deathDate?: Date) {
    if (!birthDate || !deathDate) return;
    if (dayjs(deathDate).isBefore(birthDate)) {
      throw new BadRequestException('死亡日期不能早于出生日期');
    }
  }
}
