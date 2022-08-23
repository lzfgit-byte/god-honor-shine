/**
 * https://api.nyan.xyz/httpapi/sexphoto/
 * 图片地址可以直接使用
 */
export const nyan = 'https://api.nyan.xyz/httpapi/sexphoto/';
export interface nyanGetType {
  num?: number;
  r18?: boolean;
}
export interface nyanGetResType {
  num?: number;
  url?: [x: string];
}

export type loliconSize = 'original' | 'regular' | 'small' | 'thumb' | 'mini';
export const loliconUrl = 'https://api.lolicon.app/setu/v2';
/**
 * 使用post访问
 * https://api.lolicon.app/setu/v2
 * r18  int  0  0为非 R18，1为 R18，2为混合（在库中的分类，不等同于作品本身的 R18 标识）
 * num  int  1  一次返回的结果数量，范围为1到100；在指定关键字或标签的情况下，结果数量可能会不足指定的数量
 * uid  int[]    返回指定uid作者的作品，最多20个
 * keyword  string    返回从标题、作者、标签中按指定关键字模糊匹配的结果，大小写不敏感，性能和准度较差且功能单一，建议使用tag代替
 * tag  string[]    返回匹配指定标签的作品，详见下文"tag": ?tag=萝莉|少女&tag=白丝|黑丝
 *  (萝莉 OR 少女) AND (白丝 OR 黑丝) 查找“(萝莉或少女)的(白丝或黑丝)的色图
 * size  string[]  ["original"]  返回指定图片规格的地址，详见下文
 * proxy  string  i.pixiv.cat  设置图片地址所使用的在线反代服务，详见下文
 * dateAfter  int    返回在这个时间及以后上传的作品；时间戳，单位为毫秒
 * dateBefore  int    返回在这个时间及以前上传的作品；时间戳，单位为毫秒
 * dsc  boolean  false  设置为任意真值以禁用对某些缩写keyword和tag的自动转换，详见下文
 */
export interface loliconGetType {
  r18?: number; //0为非 R18，1为 R18，2为混合
  num?: number; //范围为1到1
  uid?: [x: number]; //返回指定uid作者的作品，最多20个
  keyword?: string; //返回从标题、作者、标签中按指定关键字模糊匹配的结果，大小写不敏感，性能和准度较差且功能单一，建议使用tag代替
  tag?: string; //返回匹配指定标签的作品
  size?: [x: loliconSize]; //["original"]
  proxy?: string; //设置图片地址所使用的在线反代服务
  dateAfter?: number; // 时间戳
  dateBefore?: number; //时间戳
  dsc?: boolean; //
}

/**
 * setu
 * 字段名  数据类型  说明
 * pid  int  作品 pid
 * p  int  作品所在页
 * uid  int  作者 uid
 * title  string  作品标题
 * author  string  作者名（入库时，并过滤掉 @ 及其后内容）
 * r18  boolean  是否 R18（在库中的分类，不等同于作品本身的 R18 标识）
 * width  int  原图宽度 px
 * height  int  原图高度 px
 * tags  string[]  作品标签，包含标签的中文翻译（有的话）
 * ext  string  图片扩展名
 * uploadDate  int  作品上传日期；时间戳，单位为毫秒
 * urls  object  包含了所有指定size的图片地址
 */
export interface loliconGetResType {
  pid: number;
  p: number;
  uid: number;
  title: string;
  author: string;
  r18: boolean;
  width: number;
  height: number;
  tags: [x: string];
  ext: string;
  uploadDate: number;
  urls: Record<loliconSize, string>;
}

export type loliconRes = [x: loliconGetResType];

export default {};
