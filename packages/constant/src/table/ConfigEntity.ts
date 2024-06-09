import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@/table/MyBaseEntity';
/**
 *配置表
 */
// @ts-ignore
@Entity('config')
export class ConfigEntity extends MyBaseEntity {
  // @ts-ignore
  @Column('varchar', { comment: '配置名称' })
  name: string;

  // @ts-ignore
  @Column('varchar', { comment: '配置值' })
  value: string;
}
