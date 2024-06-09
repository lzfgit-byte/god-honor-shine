import type { DetailInfo, Item, MainPage, Pagination, Tag, WebConfig } from '@ghs/types';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { JSONParse } from '@ilzf/utils';
import { getHtml } from '../export';
import { NormalFunc } from './common-func';

export abstract class BaseBusiness extends NormalFunc {
  private key: string;
  $: CheerioAPI;
  webConfig: WebConfig;
  protected constructor(key: string, code: string) {
    super();
    this.key = key;
    this.webConfig = JSONParse(code);
  }

  getMainPageRes<T>(
    list: ($: CheerioAPI) => Cheerio<Element>,
    detail: (el: Element, $: CheerioAPI) => T
  ) {
    const res: T[] = [];
    const items: Cheerio<Element> = list(this.$);
    items.each((i, el) => {
      res.push(detail(el, this.$));
    });
    return res;
  }

  // 获取页面的元素数据
  private getItems(): Item[] {
    return this.getMainPageRes(this.webConfig.getCurrentItems, this.webConfig.getItemByEl);
  }

  // 获取页面的分页数据;
  private getPagination(): Pagination[] {
    return this.getMainPageRes(
      this.webConfig.getCurrentPagination,
      this.webConfig.getPaginationByEl
    );
  }

  // 获取首页的标签数据
  private getTags(): Tag[] {
    return this.getMainPageRes(this.webConfig.getCurrentTags, this.webConfig.getTagByEl);
  }

  /**
   * 获取页面数据，包含首页，搜索页
   */
  public async getMainPage(url: string): Promise<MainPage> {
    const html = await getHtml(url);
    this.$ = cheerio.load(html);
    return {
      items: this.getItems(),
      pagination: this.getPagination(),
      tags: this.getTags(),
      urlReplace: this.webConfig.getUrlReplace(this.$),
    };
  }

  /**
   *item 点击后，获取详细信息
   */
  public async getDetailPage(item: Item): Promise<DetailInfo> {
    return this.webConfig.getDetailInfo(item, cheerio);
  }
}
