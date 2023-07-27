import { OmitType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateAuthorDto extends OmitType(Author, ['id']) {
  /**
   * @example 小白
   */
  @IsNotEmpty()
  @IsString()
  firstName: string;

  /**
   * @example 江
   */
  @IsNotEmpty()
  @IsString()
  familyName: string;

  /**
   * @example 1919-09-09
   */
  @IsOptional()
  @IsDateString({ strict: true })
  dateOfBirth?: Date;

  /**
   * @example 1999-09-09
   */
  @IsOptional()
  @IsDateString({ strict: true })
  dateOfDeath?: Date;
}
