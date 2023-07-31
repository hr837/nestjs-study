import { OmitType } from '@nestjs/swagger';
import { Author } from '../entities/author.entity';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto extends OmitType(Author, [
  'id',
  'createDate',
  'updateDate',
]) {
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
  // @TransToDateTime()
  // @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  /**
   * @example 1999-09-09
   */
  @IsOptional()
  // @TransToDateTime()
  // @IsDate()
  @Type(() => Date)
  dateOfDeath?: Date;
}
