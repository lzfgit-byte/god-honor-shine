import type { T_OptType } from '@/types/dbTable/tableGlobal';

/**
 * 漫画观看历史
 */
export interface T_comic_history {
  id?: string;
  comicLink?: string; // 漫画链接
  contentLink?: string; // 目录跳转链接
  currentPage?: string; // 当前页数
  totalPage?: string; // 全文页数
}
const name = 'search_history';
const data: T_comic_history = {
  id: 'id',
  comicLink: 'hentaiWord',
  contentLink: 'value',
  currentPage: 'date',
  totalPage: 'date',
};

export const T_comic_history_init: T_OptType = {
  data,
  tableName: name,
};
