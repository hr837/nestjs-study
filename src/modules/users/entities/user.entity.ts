import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AppBaseEntity } from 'src/appconfig/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends AppBaseEntity {
  /**
   * 用户ID
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 登录用户名
   */
  @Column()
  userName: string;

  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  @Column()
  password: string;
}
