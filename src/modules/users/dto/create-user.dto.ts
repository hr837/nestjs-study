import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createDate',
  'updateDate',
]) {
  @IsNotEmpty()
  @Length(6, 20)
  userName: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
