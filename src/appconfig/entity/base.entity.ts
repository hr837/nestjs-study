import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TransToDateTimeString } from '../decorators/api-property.decorator';

export abstract class AppBaseEntity {
  /**
   * 创建时间
   * @example 'YYYY-MM-DD HH:mm:ss'
   */
  @CreateDateColumn()
  @TransToDateTimeString()
  createDate: Date;

  /**
   * 更新时间
   * @example 'YYYY-MM-DD HH:mm:ss'
   */
  @UpdateDateColumn()
  @TransToDateTimeString()
  updateDate: Date;
}
