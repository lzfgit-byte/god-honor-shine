import { executeFunction } from '@/utils/ipc';
import type {
  detail,
  homeInfo,
  readImgInfo,
  searchPageInfo,
} from '@/feature/18-comic/type/18-comic-type';

export const comic_getComicDetailInfo = (html: string): Promise<detail> =>
  executeFunction('comic_getComicDetailInfo', html);

export const comic_getReaderInfos = (html: string): Promise<readImgInfo> =>
  executeFunction('comic_getReaderInfos', html);

export const comic_getSearchInfo = (html: string): Promise<searchPageInfo> =>
  executeFunction('comic_getSearchInfo', html);

export const comic_getHomeInfo = (html: string): Promise<homeInfo> =>
  executeFunction('comic_getHomeInfo', html);
