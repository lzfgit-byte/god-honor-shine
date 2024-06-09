import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from './MyBaseEntity';

// @ts-ignore
@Entity('config')
export class ConfigEntity extends MyBaseEntity {
  // @ts-ignore
  @Column('varchar')
  name: string;

  // @ts-ignore
  @Column('varchar')
  value: string;
}
