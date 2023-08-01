import { IsOptional, IsString } from 'class-validator';
import { PageQueryDto } from 'src/appconfig/dto/page-query.dto';

export class UserQueryDto extends PageQueryDto {
  /**
   * 用户名
   */
  @IsOptional()
  @IsString()
  userName?: string;
}
