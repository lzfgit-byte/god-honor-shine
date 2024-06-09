import { ConfigEntity } from '@/table/ConfigEntity';
import { LogEntity } from '@/table/LogEntity';
import { ViewedHistoryEntity } from '@/table/ViewedHistoryEntity';
import { CollectEntity } from '@/table/CollectEntity';
import { SearchHistoryEntity } from '@/table/SearchHistoryEntity';

export * from './LogEntity';
export * from './ConfigEntity';
export * from './CollectEntity';
export * from './ViewedHistoryEntity';
export * from './SearchHistoryEntity';

export const Tables = [
  LogEntity,
  ConfigEntity,
  ViewedHistoryEntity,
  CollectEntity,
  SearchHistoryEntity,
];
