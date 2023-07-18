import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(createAuthorDto);
    return await author.save();
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findById(id).lean();
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return await this.authorModel.findByIdAndUpdate(id, updateAuthorDto).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
