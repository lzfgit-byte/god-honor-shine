export interface mainHtml {
  type: string;
  coverUrl: string;
  jumpUrl: string;
  count: string;
  width: string;
  height: string;
  title: string;
}

//分页信息
export interface pageInfo {
  pageNumber: string;
  jumpUrl: string;
  isCurrent: boolean;
}

//tag 信息
export interface tags {
  tageName: string;
  jumpUrl: string;
  count: string;
}

export interface htmlInfo {
  mainHtml: [x: mainHtml];
  pageInfo: [x: pageInfo];
  tags: [x: tags];
}

//视频页面返回信息
export interface videoInfo {
  videoSrc: string;
  tite: string;
}

//图片页面 多图片是下方的信息
export interface miniThumb {
  isCurrent: boolean;
  coverUrl: string;
  number: string;
  name: string;
  jumpUrl: string;
}

//页面信息
export interface imgInfo {
  original: string;
  zipUrl: string;
  name: string;
  others?: [x: miniThumb];
}
