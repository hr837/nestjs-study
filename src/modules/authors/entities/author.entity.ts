import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 名
   */
  @Column()
  firstName: string;

  /**
   * 姓
   */
  @Column()
  familyName: string;

  /**
   * 出生日期
   * @example 2020-02-02
   */
  @Column('date', {
    nullable: true,
  })
  dateOfBirth?: Date;

  /**
   * 死亡日期
   * @example 2020-02-02
   */
  @Column('date', {
    nullable: true,
  })
  dateOfDeath?: Date;

  /**
   * 全名
   */
  @Expose()
  get fullName() {
    return this.firstName + ' ' + this.familyName;
  }
}
