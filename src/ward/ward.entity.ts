import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['no'])
export class Ward extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  no: number;

  @Column()
  name: string;
}
