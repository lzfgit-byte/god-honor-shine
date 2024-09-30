import type { Request, Response } from 'express-serve-static-core';
import { net } from 'electron';
import { getQueryData } from '../utils/ServerUtil';
let baseM3u8Url = '';
export default async (route: string, req: Request, res: Response) => {
  // 发送请求到源视频流
  const queryData = getQueryData<{ url: string }>(req);
  let loadUrl = queryData.url;
  if (queryData?.url?.indexOf('m3u8')) {
    baseM3u8Url = queryData.url;
  }

  if (
    (req?.url?.indexOf('.ts') > -1 || req?.url?.indexOf('.m3u8') > -1) &&
    baseM3u8Url &&
    !queryData?.url
  ) {
    let url = baseM3u8Url.substring(0, baseM3u8Url.lastIndexOf('/'));
    loadUrl = `${url}/${req.url}`;
  }
  if (!loadUrl) {
    res.end('地址未传入');
    return;
  }
  const request = net.request(loadUrl);

  const range = req.headers.range;
  if (range) {
    request.setHeader('Range', range);
  }

  request.on('response', (response) => {
    // 设置响应头
    // res.writeHead(response.statusCode, response.headers);
    [
      'accept-ranges',
      'access-control-allow-origin',
      'cache-control',
      'content-length',
      'content-type',
      'date',
      'last-modified',
      'server',
      'x-77-cache',
      'x-77-nzt',
      'x-77-nzt-ray',
      'x-accel-expires',
      'x-cache',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
    ].forEach((key) => {
      if (response.headers[key]) {
        res.setHeader(key, response.headers[key]);
      }
    });

    // 管道响应数据
    response.on('data', (chunk) => {
      res.write(chunk);
    });
    response.on('end', () => {
      res.end();
    });
  });

  request.on('error', (error) => {
    console.error('请求出错:', error);
    res.status(500).send('Internal Server Error');
  });

  request.end();
};
