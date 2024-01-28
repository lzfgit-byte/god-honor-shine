import type { T_OptType } from '@/types/dbTable/tableGlobal';

/**
 * 漫画观看历史
 */
export interface T_comic_history {
  id?: string;
  comicLink?: string;
  contentLink?: string;
  page?: string;
}
const name = 'search_history';
const data: T_comic_history = {
  id: 'id',
  comicLink: 'hentaiWord',
  contentLink: 'value',
  page: 'date',
};

export const T_search_history_init: T_OptType = {
  data,
  tableName: name,
};
