import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;

  @Column()
  familyName: string;
}
