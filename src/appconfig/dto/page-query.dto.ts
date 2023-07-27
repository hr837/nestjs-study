import { IsNumberString, IsOptional } from 'class-validator';

export class PageQueryDto {
  /**
   * 当前页码索引，从0开始
   * @default 0 默认从0开始
   * @example 0 第1页
   */
  @IsOptional()
  @IsNumberString()
  pageIndex?: number = 0;

  /**
   * 每页数据量
   * @default 10 默认每页10条
   * @example 20 返回20条
   */
  @IsOptional()
  @IsNumberString()
  pageSize?: number = 10;

  get skip() {
    return Number.parseInt(`${this.pageIndex}`) * this.take;
  }

  get take() {
    return Number.parseInt(`${this.pageSize}`);
  }
}
