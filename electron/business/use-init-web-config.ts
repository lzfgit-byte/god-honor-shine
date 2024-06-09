import type { WebConfig } from '@ghs/types';
import { JSONParse } from '@ilzf/utils';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
// @ts-ignore
import demoWebCode from './hentai-code-webconfig?raw';

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
function helpElAttr($el: Cheerio<Element>, attr: string): string {
  return $el?.attr(attr) || '';
}

function helpElText($el: Cheerio<Element>): string {
  return $el?.text() || '';
}
export const getWebConfigByKey = (key: string) => {
  return cache[key];
};
export const getWebConfigAry = (): WebConfig[] => {
  return Object.values(cache);
};
export const loadWebConfig = () => {
  const config: WebConfig = eval(wrapperCode(demoWebCode))(helpElAttr, helpElText);
  cache[config.key] = config;
};

export default () => {
  loadWebConfig();
};
