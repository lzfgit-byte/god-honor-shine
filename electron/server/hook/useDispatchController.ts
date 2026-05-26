import type { Request, Response } from 'express-serve-static-core';
import { hashString } from '@ilzf/utils';
import { type Analysis, FileType, type Item } from '@ghs/types';
import { getQueryData, setDefaultHeader } from '../utils/ServerUtil';
import {
  cancelCollect,
  clearCurrentUrl,
  deleteSearch,
  getAnalysisDetail,
  getAnalysisVideoDetail,
  getComicIImages,
  getContent,
  getCurrentContentUrl,
  getCurrentWebConfig,
  getDetailPage,
  getHtml,
  getImage,
  getPage,
  getSeriesCurrentContent,
  isCollect,
  listAllWebConfigs,
  listCollect,
  listHistory,
  loadPage,
  saveCollect,
  search,
  searchRecommend,
  setCurrentKeyExp,
  updateCurrentComic,
} from '../../export';
import { cache_exist, cache_get, cache_save, cache_suffix_clean } from '../../utils';
import { adapterImageBase64ByWin } from '../../http';
import { getCurrentKey, getWebConfigByKey } from '../../business/use-init-web-config';
import { parseAdapterImageUrl } from '../../business/adapter-image-url';

const imageRequestMap = new Map<string, Promise<string>>();

const getImageByUrl = async (url: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('data:')) {
    return url;
  }

  const currentKey = getCurrentKey();
  const adapterImage: any = parseAdapterImageUrl(url);
  const webConfig = adapterImage.extra ? getWebConfigByKey(currentKey) : null;
  const imageCacheKey =
    adapterImage.extra && webConfig?.adapterImageCode
      ? `${currentKey}:${hashString(webConfig.adapterImageCode)}:${url}`
      : adapterImage.url;
  const runningTask = imageRequestMap.get(imageCacheKey);
  if (runningTask) {
    return runningTask;
  }

  const task = (async () => {
    if (cache_exist(imageCacheKey, FileType.IMAGE)) {
      return cache_get(imageCacheKey, FileType.IMAGE) || '';
    }

    let resData = '';
    if (adapterImage.extra && webConfig?.adapterImageCode) {
      resData = await adapterImageBase64ByWin(
        adapterImage.url,
        webConfig.adapterImageCode,
        adapterImage.extra
      );
      if (resData) {
        return cache_save(imageCacheKey, resData, FileType.IMAGE);
      }
    }
    return await getImage(adapterImage.url);
  })();

  imageRequestMap.set(imageCacheKey, task);
  task
    .finally(() => {
      imageRequestMap.delete(imageCacheKey);
    })
    .catch(() => undefined);
  return task;
};

export default async (route: string, req: Request, res: Response) => {
  setDefaultHeader(res);
  switch (route) {
    case '/getPage': {
      const queryData = getQueryData<{ webKey: string }>(req);
      const resData = await getPage(queryData.webKey);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/loadPage': {
      const queryData = getQueryData<{ url: string }>(req);
      const resData = await loadPage(queryData.url);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getImage': {
      const queryData = getQueryData<{ url: string }>(req);
      const resData = await getImageByUrl(queryData.url);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/listAllWebConfigs': {
      const resData = await listAllWebConfigs();
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getDetailPage': {
      const queryData = getQueryData<{ item: Item }>(req);
      const resData = await getDetailPage(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getCurrentWebConfig': {
      const queryData = getQueryData<{ webKey: string }>(req);
      const resData = await getCurrentWebConfig(queryData.webKey);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/search': {
      const queryData = getQueryData<{ search: string; item: Item }>(req);
      const resData = await search(queryData.search, queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/isCollect': {
      const queryData = getQueryData<{ item: Item }>(req);
      const resData = await isCollect(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/saveCollect': {
      const queryData = getQueryData<{ item: Item }>(req);
      const resData = await saveCollect(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/cancelCollect': {
      const queryData = getQueryData<{ item: Item }>(req);
      const resData = await cancelCollect(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/listCollect': {
      const queryData = getQueryData<{ webKey: string }>(req);
      const resData = await listCollect(queryData.webKey);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getHtml': {
      const queryData = getQueryData<{ url: string }>(req);
      const resData = await getHtml(queryData.url);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/searchRecommend': {
      const queryData = getQueryData<{ search: string }>(req);
      const resData = await searchRecommend(queryData.search);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/deleteSearch': {
      const queryData = getQueryData<{ searchValue: string }>(req);
      const resData = await deleteSearch(queryData.searchValue);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/cacheSuffixClean': {
      const queryData = getQueryData<{ fileSuffix?: string }>(req);
      cache_suffix_clean(queryData.fileSuffix);
      res.end(JSON.stringify(''));
      break;
    }
    case '/listHistory': {
      const resData = await listHistory();
      res.end(JSON.stringify(resData));
      break;
    }
    case '/clearCurrentUrl': {
      const resData = await clearCurrentUrl();
      res.end(JSON.stringify(resData));
      break;
    }
    case '/setCurrentKeyExp': {
      const queryData = getQueryData<{ key?: string }>(req);
      const resData = await setCurrentKeyExp(queryData.key);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getAnalysisDetail': {
      const queryData = getQueryData<{ item: Analysis }>(req);
      const resData = await getAnalysisDetail(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getAnalysisVideoDetail': {
      const queryData = getQueryData<{ item: Analysis }>(req);
      const resData = await getAnalysisVideoDetail(queryData.item);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getSeriesCurrentContent': {
      const resData = await getSeriesCurrentContent();
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getContent': {
      const queryData = getQueryData<{ url: string }>(req);
      const resData = await getContent(queryData.url);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getComicIImages': {
      const queryData = getQueryData<{ url: string }>(req);
      const resData = await getComicIImages(queryData.url);
      res.end(JSON.stringify(resData));
      break;
    }
    case '/getCurrentContentUrl': {
      const resData = await getCurrentContentUrl();
      res.end(JSON.stringify(resData));
      break;
    }
    case '/updateCurrentComic': {
      const queryData = getQueryData<{ per: string }>(req);
      const resData = await updateCurrentComic(Number(queryData.per));
      res.end(JSON.stringify(resData));
      break;
    }
  }
};
