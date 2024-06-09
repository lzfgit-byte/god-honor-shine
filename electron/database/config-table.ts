import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @ts-ignore
@Entity('config')
export class ConfigEntity extends BaseEntity {
  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @Column('varchar')
  name: string;

  // @ts-ignore
  @Column('varchar')
  value: string;

  // @ts-ignore
  @Column('datetime')
  createTime: any;
}
