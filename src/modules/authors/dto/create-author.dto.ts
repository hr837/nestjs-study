import { OmitType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateAuthorDto extends OmitType(Author, [
  'id',
  'dateOfBirth',
  'dateOfDeath',
]) {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  familyName: string;

  @IsOptional()
  @IsDateString({ strict: true })
  dateOfBirth?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  dateOfDeath?: string;
}
