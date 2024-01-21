import type { T_OptType } from '@/types/dbTable/tableGlobal';
import type { MessageType } from '@/types/message';

export interface T_logger {
  id?: string;
  type?: string | MessageType;
  value?: string;
  time?: string;
}
const name = 'logger';
const data: T_logger = {
  id: 'id',
  type: 'type',
  value: 'value',
  time: 'date',
};

export const T_logger_init: T_OptType = {
  data,
  tableName: name,
};
