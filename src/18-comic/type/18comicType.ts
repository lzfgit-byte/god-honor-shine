export default {};
export const HOME_URL = 'https://18comic.vip/';
export interface typeType {
  title?: string;
  color?: string;
}
export interface tagType {
  title?: string;
  jumpUrl?: string;
}
export interface comicCover {
  coverUrl?: string;
  jumpUrl?: string;
  title?: string;
  author?: string;
  type?: typeType[];
  tags?: tagType[];
  heart?: number;
}

/**
 * 连载更新  最新韩漫 本子推荐 最新本子
 */
export interface homeInfo {
  serialLatest: comicCover[];
  latestKoreanComic: comicCover[];
  recommend: comicCover[];
  latest: comicCover[];
}

/**
 * 目录
 */
export interface content {
  title?: string;
  jumpUrl?: string;
  current?: boolean;
}
export interface detail {
  des?: string;
  reading?: string;
  title?: string;
  contents?: content[];
}

/**
 * 阅读也
 */
export interface readImg {
  src: string;
}
export interface readImgInfo {
  aid?: string;
  imgs?: readImg[];
  scramble_id?: string;
}
export interface pageInfo {
  jumpUrl?: string;
  title?: string;
  isCurrent?: boolean;
}
export interface seaerchPageInfo {
  covers?: comicCover[];
  pageInfos?: pageInfo[];
}

export const COMIC_HISTORY_KEY = '18ComicHistory';

export interface setting {
  detail?: detail;
  item?: content;
}
export interface setWrapper {
  array?: setting[];
}

export const ComicTagsInfo = [
  { title: '总排行', jumpUrl: HOME_URL + 'albums?o=mv' },
  { title: '月排行', jumpUrl: HOME_URL + 'albums?t=m&o=mv' },
  { title: '周排行', jumpUrl: HOME_URL + 'albums?o=mv&t=w' },
  { title: '天排行', jumpUrl: HOME_URL + 'albums?o=mv&t=t' },
  { title: '透視', jumpUrl: HOME_URL + 'search/photos?search_query=透視' },
  { title: '火影', jumpUrl: HOME_URL + 'search/photos?search_query=火影' },
  { title: 'PIXIV', jumpUrl: HOME_URL + 'search/photos?search_query=PIXIV' },
  { title: '懷孕', jumpUrl: HOME_URL + 'search/photos?search_query=懷孕' },
  { title: '禁漫書庫', jumpUrl: HOME_URL + 'search/photos?search_query=禁漫書庫' },
  { title: '大尺度', jumpUrl: HOME_URL + 'search/photos?search_query=大尺度' },
  { title: 'ユウキHB', jumpUrl: HOME_URL + 'search/photos?search_query=ユウキHB' },
  { title: 'over.J', jumpUrl: HOME_URL + 'search/photos?search_query=over.J' },
  { title: '性愛房間', jumpUrl: HOME_URL + 'search/photos?search_query=性愛房間' },
  {
    title: '請對標籤君手下留情b',
    jumpUrl: HOME_URL + 'search/photos?search_query=請對標籤君手下留情b',
  },
  { title: '最新A漫', jumpUrl: HOME_URL + 'albums?o=mr' },
  { title: 'Cosplay', jumpUrl: HOME_URL + 'albums/another/sub/cosplay' },
  { title: '3D', jumpUrl: HOME_URL + 'search/photos?search_query=3D' },
  { title: '無修正', jumpUrl: HOME_URL + 'search/photos?search_query=無修正' },
  { title: '劇情向', jumpUrl: HOME_URL + 'search/photos?search_query=劇情向' },
  { title: '青年漫', jumpUrl: HOME_URL + 'search/photos?search_query=青年漫' },
  { title: '校服', jumpUrl: HOME_URL + 'search/photos?search_query=校服' },
  { title: '純愛', jumpUrl: HOME_URL + 'search/photos?search_query=純愛' },
  { title: '人妻', jumpUrl: HOME_URL + 'search/photos?search_query=人妻' },
  { title: '教師', jumpUrl: HOME_URL + 'search/photos?search_query=教師' },
  { title: '百合', jumpUrl: HOME_URL + 'search/photos?search_query=百合' },
  { title: 'Yaoi', jumpUrl: HOME_URL + 'search/photos?search_query=Yaoi' },
  { title: '性轉', jumpUrl: HOME_URL + 'search/photos?search_query=性轉' },
  { title: 'NTR', jumpUrl: HOME_URL + 'search/photos?search_query=NTR' },
  { title: '女裝', jumpUrl: HOME_URL + 'search/photos?search_query=女裝' },
  { title: '癡女', jumpUrl: HOME_URL + 'search/photos?search_query=癡女' },
  { title: '全彩', jumpUrl: HOME_URL + 'search/photos?search_query=全彩' },
  { title: '女性向', jumpUrl: HOME_URL + 'search/photos?search_query=女性向' },
  { title: '完結', jumpUrl: HOME_URL + 'search/photos?search_query=完結' },
  { title: '純愛', jumpUrl: HOME_URL + 'search/photos?search_query=純愛' },
  { title: '禁漫漢化組', jumpUrl: HOME_URL + 'search/photos?search_query=禁漫漢化組' },
  { title: '御姐', jumpUrl: HOME_URL + 'search/photos?search_query=御姐' },
  { title: '熟女', jumpUrl: HOME_URL + 'search/photos?search_query=熟女' },
  { title: '巨乳', jumpUrl: HOME_URL + 'search/photos?search_query=巨乳' },
  { title: '貧乳', jumpUrl: HOME_URL + 'search/photos?search_query=貧乳' },
  { title: '女性支配', jumpUrl: HOME_URL + 'search/photos?search_query=女性支配' },
  { title: '教師', jumpUrl: HOME_URL + 'search/photos?search_query=教師' },
  { title: '女僕', jumpUrl: HOME_URL + 'search/photos?search_query=女僕' },
  { title: '護士', jumpUrl: HOME_URL + 'search/photos?search_query=護士' },
  { title: '泳裝', jumpUrl: HOME_URL + 'search/photos?search_query=泳裝' },
  { title: '眼鏡', jumpUrl: HOME_URL + 'search/photos?search_query=眼鏡' },
  { title: '連褲襪', jumpUrl: HOME_URL + 'search/photos?search_query=連褲襪' },
  { title: '其他制服', jumpUrl: HOME_URL + 'search/photos?search_query=其他制服' },
  { title: '兔女郎', jumpUrl: HOME_URL + 'search/photos?search_query=兔女郎' },
  { title: '群交', jumpUrl: HOME_URL + 'search/photos?search_query=群交' },
  { title: '足交', jumpUrl: HOME_URL + 'search/photos?search_query=足交' },
  { title: '束縛', jumpUrl: HOME_URL + 'search/photos?search_query=束縛' },
  { title: '肛交', jumpUrl: HOME_URL + 'search/photos?search_query=肛交' },
  { title: '阿黑顏', jumpUrl: HOME_URL + 'search/photos?search_query=阿黑顏' },
  { title: '藥物', jumpUrl: HOME_URL + 'search/photos?search_query=藥物' },
  { title: '扶他', jumpUrl: HOME_URL + 'search/photos?search_query=扶他' },
  { title: '調教', jumpUrl: HOME_URL + 'search/photos?search_query=調教' },
  { title: '野外露出', jumpUrl: HOME_URL + 'search/photos?search_query=野外露出' },
  { title: '催眠', jumpUrl: HOME_URL + 'search/photos?search_query=催眠' },
  { title: '自慰', jumpUrl: HOME_URL + 'search/photos?search_query=自慰' },
  { title: '觸手', jumpUrl: HOME_URL + 'search/photos?search_query=觸手' },
  { title: '獸交', jumpUrl: HOME_URL + 'search/photos?search_query=獸交' },
  { title: '亞人', jumpUrl: HOME_URL + 'search/photos?search_query=亞人' },
  { title: '怪物女孩', jumpUrl: HOME_URL + 'search/photos?search_query=怪物女孩' },
  { title: '皮物', jumpUrl: HOME_URL + 'search/photos?search_query=皮物' },
  { title: 'ryona', jumpUrl: HOME_URL + 'search/photos?search_query=ryona' },
  { title: '騎大車', jumpUrl: HOME_URL + 'search/photos?search_query=騎大車' },
  { title: 'CG', jumpUrl: HOME_URL + 'search/photos?search_query=CG' },
  { title: '重口', jumpUrl: HOME_URL + 'search/photos?search_query=重口' },
  { title: '獵奇', jumpUrl: HOME_URL + 'search/photos?search_query=獵奇' },
  { title: '非H', jumpUrl: HOME_URL + 'search/photos?search_query=非H' },
  { title: '血腥暴力', jumpUrl: HOME_URL + 'search/photos?search_query=血腥暴力' },
  { title: '站長推薦', jumpUrl: HOME_URL + 'search/photos?search_query=站長推薦' },
];
