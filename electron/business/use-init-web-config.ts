import type { WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { keys } from 'lodash';
import { isFunction } from '@ilzf/utils';
// @ts-ignore
import demoWebCode from './hentai-code-webconfig?raw';

export let currentKey = '';
const cache: Record<string, WebConfig> = {};
const breakStr = '/* break */';
const wrapperCode = (code: string) => {
  const codes = code.split(breakStr);
  if (codes.length === 3) {
    let res = codes[2];
    let replace = codes[1].substring(0, codes[1].lastIndexOf(';'));
    res = res.replace(`'$code'`, replace);
    return res;
  }
};
export const getWebConfigByKey = (key: string) => {
  return cache[key];
};
export const getWebConfigAry = (): WebConfig[] => {
  const res: WebConfig[] = [];
  keys(cache).forEach((key) => {
    const wc = cache[key];
    const foo: WebConfig = {} as any;
    keys(wc).forEach((cKey) => {
      if (!isFunction(wc[cKey])) {
        foo[cKey] = wc[cKey];
      }
    });
    res.push(foo);
  });
  return res;
};
export const loadWebConfig = () => {
  function helpElAttr($el: Cheerio<Element>, attr: string): string {
    return $el?.attr(attr) || '';
  }

  function helpElText($el: Cheerio<Element>): string {
    return $el?.text() || '';
  }
  const config: WebConfig = eval(wrapperCode(demoWebCode))(helpElAttr, helpElText);
  cache[config.key] = config;
  currentKey = config.key;
};

export default () => {
  loadWebConfig();
};
