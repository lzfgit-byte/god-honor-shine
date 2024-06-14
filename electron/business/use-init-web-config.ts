import type { BaseConfig, WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { keys } from 'lodash';
import { hashString, isFunction } from '@ilzf/utils';

import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml } from '../export';
import { LogMsgUtil, NotifyMsgUtil } from '../utils/message';
import { eventEmitter, helpElAttr, helpElText } from '../utils/KitUtil';
// @ts-ignore
import demoWebCode from './webconfigs/hentai-code-webconfig?raw';
// @ts-ignore
import rule34 from './webconfigs/rule34-code-webconfiig?raw';
// @ts-ignore
import lulu from './webconfigs/lulu-code-webconfig?raw';
// @ts-ignore
import badnew from './webconfigs/badnews-code-webconfig?raw';
// @ts-ignore
import staticCode from './static-code?raw';

const configs: string[] = [demoWebCode, rule34, lulu, badnew];

let currentKey = '';
export const setCurrentKey = (key: string) => {
  currentKey = key;
};
export const getCurrentKey = () => currentKey;

const cache: Record<string, WebConfig> = {};
const breakStr = '/* break */';
const staticBreak = '//* **';
const wrapperCode = (code: string) => {
  const codes = code.split(breakStr);
  if (codes.length === 2) {
    let replace = codes[1].substring(0, codes[1].lastIndexOf(';'));
    return staticCode.replaceAll(staticBreak, '').replace(`'$code'`, replace);
  }
};
export const getWebConfigByKey = (key: string) => {
  return cache[key];
};
export const getBaseConfigByKey = (key: string): BaseConfig => {
  const wc = cache[key];
  const foo: WebConfig = {} as any;
  keys(wc).forEach((cKey) => {
    if (!isFunction(wc[cKey])) {
      foo[cKey] = wc[cKey];
    }
  });
  return foo;
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
  configs.forEach((item) => {
    const config: WebConfig = new Function(wrapperCode(item))(
      helpElAttr,
      helpElText,
      ElementAttr,
      ElementTypes,
      getHtml,
      NotifyMsgUtil,
      LogMsgUtil,
      hashString,
      eventEmitter
    );
    cache[config.key] = config;
    if (!getCurrentKey()) {
      setCurrentKey(config.key);
    }
  });
};

export default () => {
  loadWebConfig();
};
