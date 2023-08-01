import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRespository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = plainToInstance(User, createUserDto);
    return this.usersRespository.save(user);
  }

  async findAll(query: UserQueryDto) {
    // where 条件组合
    const where: FindOptionsWhere<User>[] = [];
    if (query.userName?.trim()) {
      where.push({ userName: Like(`%${query.userName.trim()}%`) });
    }
    const [rows, total] = await this.usersRespository.findAndCount({
      where,
      skip: query.skip,
      take: query.take,
    });
    return {
      rows,
      total,
    };
  }

  findOne(id: string) {
    return this.usersRespository.findOneBy({ id });
  }

  findOneByInfo(userName: string, password: string) {
    return this.usersRespository.findOneBy({ userName, password });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRespository.findOneBy({
      id,
      password: updateUserDto.oldPwd,
    });
    if (!user) throw new BadRequestException('用户ID或密码不匹配');
    const result = await this.usersRespository.update(id, {
      password: updateUserDto.newPwd,
    });
    return result.affected === 1;
  }

  async remove(id: string) {
    await this.usersRespository.delete(id);
    const user = await this.usersRespository.findOneBy({ id });
    return !user;
  }
}
