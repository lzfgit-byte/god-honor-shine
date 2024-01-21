import type { T_OptType } from '@/types/dbTable/tableGlobal';

export interface T_config {
  id?: string;
  name?: string;
  value?: string;
  flag?: string;
}
const T_config_name = 'config';
const T_config_Data: T_config = {
  id: 'string',
  name: 'string',
  value: 'string',
  flag: 'string',
};

export const T_config_init: T_OptType = {
  data: T_config_Data,
  tableName: T_config_name,
};
