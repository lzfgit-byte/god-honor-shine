import * as http from '@/utils/http';
import * as hwParse from '@/hentai-word/utils/hentai-word-parse';

import * as solveImg from '@/utils/solveImg';
import * as file from '@/utils/file';
import * as cache from '@/utils/cache';
import * as urls from '@/utils/urls';
import * as net from '@/utils/net';
import * as setting from '@/utils/setting';
import type { fileMethods } from '@/utils/file';
import type { cacheMethods } from '@/utils/cache';

const isBlank = (str) => {
  return str === undefined || (str.trim && str.trim() === '');
};
export const allFunc = {
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
  let exportFunc = {};
  Object.keys(allFunc).forEach((funcName) => {
    exportFunc[funcName] = async (...args) => {
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
