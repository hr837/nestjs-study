import { IsOptional, IsString } from 'class-validator';
import { PageQueryDto } from 'src/appconfig/dto/page-query.dto';

export class BookQueryDto extends PageQueryDto {
  /**
   * 图书名称
   */
  @IsOptional()
  @IsString()
  title?: string;
}
