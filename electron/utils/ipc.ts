import * as http from './http';
import * as hwParse from '../hentai-word/hentai-word-parse';

import * as solveImg from './solveImg';
import * as file from './file';
import * as cache from './cache';
import * as urls from './urls';
import * as net from './net';
import * as setting from './setting';

const isBlank = (str: string) => {
  return str === undefined || (str.trim && str.trim() === '');
};
export const allFunc: any = {
  ...http,
  ...hwParse,
  ...solveImg,
  ...file,
  ...cache,
  ...urls,
  ...net,
  ...setting,
};
export const exportFunc: any = (() => {
  const exportFunc: any = {};
  Object.keys(allFunc).forEach((funcName) => {
    exportFunc[funcName] = async (sender: any, ...args: any) => {
      if (args.length > 0 && isBlank(args[0])) return;
      return allFunc[funcName](...args);
    };
  });
  return exportFunc;
})();

export default {
  ...http,
  ...hwParse,
  ...solveImg,
  ...file,
  ...cache,
  ...urls,
  ...net,
  ...setting,
};
