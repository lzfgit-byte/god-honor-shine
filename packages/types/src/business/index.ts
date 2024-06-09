export interface Pagination {
  url: string;
  title: string;
  isCurrent: boolean;
}
export interface Tag {
  title: string;
  url: string;
}
export enum ItemType {
  video = 'video',
  image = 'image',
  text = 'text',
  comic = 'comic',
}
export enum ItemDetailType {
  mp4 = 'mp4',
  m3u8 = 'm3u8',
  image = 'image',
}
export enum RenderType {
  force = 'force',
  normal = 'normal',
}
export interface Detail {
  url: string;
  quality?: string;
  comments: Comment[];
}
export interface Item {
  coverImg: string;
  title: string;
  type: ItemType;
  jumpUrl: string;
  renderType: RenderType; // 渲染类型,强制渲染,正常渲染
  tags: Tag[];
}
export interface Comment {
  datetime: string;
  comment: string;
}
/**
 *点击Item,后获取详细信息
 */
export interface DetailInfo {
  detailType: ItemDetailType;
  renderType: RenderType; // 渲染类型,强制渲染,正常渲染
  details: Detail[];
  relations: Item[];
}

/**
 * 每一页的类型
 */
export interface MainPage {
  pagination: Pagination[]; // 分页
  tags: Tag[];
  items: Item[];
}
