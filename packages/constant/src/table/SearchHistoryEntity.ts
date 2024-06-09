import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@/table/MyBaseEntity';

// @ts-ignore
@Entity('search_history', { comment: '观看的历史表' })
export class SearchHistoryEntity extends MyBaseEntity {
  // @ts-ignore
  @Column('varchar', { comment: '搜索历史类型' })
  type: string;

  // @ts-ignore
  @Column('varchar', { comment: '搜索的关键值' })
  value: string;
}
