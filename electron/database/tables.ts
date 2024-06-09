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

// @ts-ignore
@Entity('log')
export class LogEntity extends MyBaseEntity {
  static log(info_: string, type_: 'info' | 'error' = 'info') {
    const info = info_ || '';
    const type = type_ || 'info';
    const entity = new LogEntity();
    entity.info = info;
    entity.type = type;
    entity.save().then(() => 1);
  }

  // @ts-ignore
  @Column('varchar')
  info: string;

  // @ts-ignore
  @Column('varchar')
  type: 'info' | 'error';
}
