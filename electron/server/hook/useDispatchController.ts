import type { Request, Response } from 'express-serve-static-core';
import type { Item } from '@ghs/types';
import { getQueryData, setDefaultHeader } from '../utils/ServerUtil';
import { getDetailPage, getImage, getPage, listAllWebConfigs, loadPage } from '../../export';
export default async (route: string, req: Request, res: Response) => {
  setDefaultHeader(res);
  if (route === '/getPage') {
    const queryData = getQueryData<{ webKey: string }>(req);
    const resData = await getPage(queryData.webKey);
    res.end(JSON.stringify(resData));
  }
  if (route === '/loadPage') {
    const queryData = getQueryData<{ url: string }>(req);
    const resData = await loadPage(queryData.url);
    res.end(JSON.stringify(resData));
  }
  if (route === '/getImage') {
    const queryData = getQueryData<{ url: string }>(req);
    const resData = await getImage(queryData.url);
    res.end(JSON.stringify(resData));
  }
  if (route === '/listAllWebConfigs') {
    const resData = await listAllWebConfigs();
    res.end(JSON.stringify(resData));
  }
  if (route === '/getDetailPage') {
    const queryData = getQueryData<Item>(req);
    const resData = await getDetailPage(queryData);
    res.end(JSON.stringify(resData));
  }
};
