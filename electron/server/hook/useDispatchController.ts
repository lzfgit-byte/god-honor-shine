import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import type { Request, Response } from 'express-serve-static-core';
import { getQueryData, setDefaultHeader } from '../utils/ServerUtil';
import { getPage, loadPage } from '../../export';
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
};
