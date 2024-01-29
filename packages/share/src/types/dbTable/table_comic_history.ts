import type { T_OptType } from '@/types/dbTable/tableGlobal';

/**
 * 漫画观看历史
 */
export interface T_comic_history {
  id?: string;
  comic_link?: string; // 漫画链接
  content_link?: string; // 目录跳转链接
  current_page?: string; // 当前页数
  total_page?: string; // 全文页数
}
const name = 'comic_history';
const data: T_comic_history = {
  id: 'id',
  comic_link: 'hentaiWord',
  content_link: 'value',
  current_page: 'date',
  total_page: 'date',
};

export const T_comic_history_init: T_OptType = {
  data,
  tableName: name,
};
