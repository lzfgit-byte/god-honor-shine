import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@/table/my-base-entity';

// @ts-ignore
@Entity('web-config', { comment: '网站配置表' })
export class WebConfigEntity extends MyBaseEntity {
  // @ts-ignore
  @Column('varchar', { comment: '收藏的类型' })
  key: string;

  // @ts-ignore
  @Column('varchar', { comment: '收藏的url' })
  code: string;

  // @ts-ignore
  @Column('integer', { comment: '收藏的url' })
  sort: number;
}
