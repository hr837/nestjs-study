import { ApiProperty } from '@nestjs/swagger';

/**
 * 分页查询返回的数据
 */
export class PageDataDto<T> {
  @ApiProperty({
    description: '本次返回的数据行',
  })
  rows: T[];

  @ApiProperty({
    description: '共有数据的行数',
  })
  total: number;
}
