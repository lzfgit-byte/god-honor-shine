import type { DetailInfo, Item, Page, Pagination, Tag, WebConfig } from '@ghs/types';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { isFalsity } from '@ilzf/utils';
import { SearchHistoryEntity, ViewedHistoryEntity } from '@ghs/constant';
import { getHtml } from '../export';
import { LogMsgUtil } from '../utils/message';
import { NormalFunc } from './common-func';
import { getWebConfigByKey } from './use-init-web-config';

class BaseBusiness extends NormalFunc {
  private key: string;
  $: CheerioAPI;
  webConfig: WebConfig;
  public constructor(key: string, code: WebConfig) {
    super();
    this.key = key;
    this.webConfig = code;
  }

  // 获取页面的元素数据
  private getItems(): Item[] {
    return this.webConfig.getItems(this.$);
  }

  // 获取页面的分页数据;
  private getPagination(): Pagination[] {
    return this.webConfig.getPagination(this.$);
  }

  // 获取首页的标签数据
  private getTags(): Tag[] {
    return this.webConfig.getTags(this.$);
  }

  // 存储搜索历史记录
  private async saveSearchKey(key: string) {
    this.webConfig.searchKey = key;
    const ent = new SearchHistoryEntity();
    ent.type = this.webConfig.key;
    ent.value = key;
    await ent.save();
  }

  // 存储观看历史
  private async saveViewHistory(item: Item) {
    const ent = new ViewedHistoryEntity();
    ent.type = this.webConfig.key;
    ent.value = JSON.stringify(item);
    await ent.save();
    LogMsgUtil.sendLogMsg(`历史观看记录保存成功: ${ent.value}`);
  }

  /**
   * 获取页面数据，包含首页，搜索页
   */
  public async getPage(url = this.webConfig.homeUrl): Promise<Page> {
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
    this.saveViewHistory(item).then();
    return this.webConfig.getDetailInfo(item, cheerio);
  }

  /**
   * 搜索
   * @param keyword
   */
  public async search(keyword: string): Promise<Page> {
    this.saveSearchKey(keyword).then();
    return this.getPage(this.webConfig.adapterSearchUrl(keyword));
  }
}

/**
 * business 缓存
 */
const cache: Record<string, BaseBusiness> = {};
export const getCurrentBusiness = (key: string) => {
  let res: BaseBusiness = cache[key];
  if (isFalsity(res)) {
    res = new BaseBusiness(key, getWebConfigByKey(key));
  }
  return res;
};
