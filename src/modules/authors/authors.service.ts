import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return 'This action adds a new author';
  }

  findAll() {
    return this.authorsRepository.find();
  }

  findOne(id: string) {
    return this.authorsRepository.findOneBy({ id });
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: string) {
    return this.authorsRepository.delete(id);
  }
}
