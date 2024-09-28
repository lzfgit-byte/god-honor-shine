import type { Request, Response } from 'express-serve-static-core';
import { net } from 'electron';
import { getQueryData } from '../utils/ServerUtil';
export default async (route: string, req: Request, res: Response) => {
  // 发送请求到源视频流
  const queryData = getQueryData<{ url: string }>(req);
  if (!queryData.url) {
    res.end('地址未传入');
    return;
  }
  const request = net.request(queryData.url);

  const range = req.headers.range;
  if (range) {
    request.setHeader('Range', range);
  }

  request.on('response', (response) => {
    // 设置响应头
    res.writeHead(response.statusCode, response.headers);
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
