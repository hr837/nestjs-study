import { OmitType } from '@nestjs/swagger';
import { Author } from '../schemas/author.schema';

export class CreateAuthorDto extends OmitType(Author, ['id']) {
  /**
   * @example 2023-07-18
   */
  date_of_birth?: Date;

  /**
   * @example 2023-07-18
   */
  date_of_death?: Date;
}
