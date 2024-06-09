import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from './MyBaseEntity';

// @ts-ignore
@Entity('log')
export class LogEntity extends MyBaseEntity {
  // @ts-ignore
  @Column('varchar')
  info: string;
}
