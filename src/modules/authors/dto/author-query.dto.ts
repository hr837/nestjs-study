import { IsOptional, IsString } from 'class-validator';
import { PageQueryDto } from 'src/appconfig/dto/page-query.dto';

export class AuthorQueryDto extends PageQueryDto {
  /**
   * 作者姓名
   */
  @IsOptional()
  @IsString()
  name?: string;
}
