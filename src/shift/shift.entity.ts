import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ShiftTypes } from './shift-types.enum';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ShiftTypes;
}
