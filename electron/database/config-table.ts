import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class Config {
  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @Column('varchar')
  name: string;

  @Column('varchar')
  value: string;

  // @ts-ignore
  @Column('datetime')
  createTime: boolean;
}
