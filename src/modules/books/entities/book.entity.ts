import { ApiHideProperty } from '@nestjs/swagger';
import { AppBaseEntity } from 'src/appconfig/entity/base.entity';
import { Author } from 'src/modules/authors/entities/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Book extends AppBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 图书标题
   */
  @Column()
  title: string;

  /**
   * 图书ISBN号
   */
  @Column()
  isbn: string;

  /**
   * 图书摘要信息
   */
  @Column()
  summary?: string;

  /**
   * 作者信息
   */
  @OneToOne(() => Author)
  @JoinColumn()
  @ApiHideProperty()
  author: Author;

  /**
   * 作者ID
   */
  @RelationId((book: Book) => book.author)
  authorId: string;
}
