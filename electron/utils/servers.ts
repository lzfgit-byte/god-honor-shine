import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { cached, getCachePath, hasCacheSync } from './cache';
import fs from 'fs-extra';
import { sendMessage } from './message';
import { formatSize } from './file';

const { net } = require('electron');
let requestMap: any = {};
const hasFileExist = (url: string, req: any, res: any) => {
  const path = getCachePath(url);
  sendMessage('视频缓存:' + path);
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    //有range头才使用206状态码
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
    // end 在最后取值为 fileSize - 1
    end = end > fileSize - 1 ? fileSize - 1 : end;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      // 'Content-Length': chunksize,
      'Content-Type': 'video/*',
    };
    res.writeHead(206, head);
    file.pipe(res);
  }
};
const requestFormUrl = (url: string, res: any) => {
  let blob: any = Buffer.alloc(0),
    fileSize: any = 0;
  const request = net.request(url);
  requestMap[url] = request;
  request.on('response', (response) => {
    const header = response.headers;
    fileSize = +header['content-length'];
    response.on('data', (chunk) => {
      blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      sendMessage(`received[${formatSize(blob.length)}/${formatSize(fileSize)}]`);
      res.write(chunk);
    });
    response.on('end', () => {
      cached(url, blob);
      sendMessage('end');
    });
    response.on('error', () => {
      sendMessage('net 请求 error');
    });
  });
  request.on('error', () => {
    sendMessage('request error');
  });
  request.end();
  res.on('close', () => {
    request.abort();
    sendMessage('close');
  });
};
// req 路由监听空 res 上下文函数
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, {
    //设置允许跨域的域名，*代表允许任意域名跨域
    'Access-Control-Allow-Origin': '*',
  });
  // 路由监控
  const reqUrl = req?.url;
  if (reqUrl) {
    if (reqUrl.startsWith('/getByte')) {
      const url = reqUrl.replace('/getByte?url=', '');
      console.log('aa');
      if (hasCacheSync(url)) {
        hasFileExist(url, req, res);
        return;
      }
      console.log('bb');
      const range = req.headers.range;
      requestFormUrl(url, res);
    } else if (reqUrl.startsWith('/closed')) {
      const url = reqUrl.replace('/closed?url=', '');
      const request = requestMap[url];
      request && request?.abort();
      delete requestMap[url];
      if (request) {
        res.end();
        sendMessage('abord');
      }
    }
  } else {
    res.end();
  }
});
server.listen(3333, '127.0.0.1', () => {
  console.log('http://127.0.0.1:3333/');
});

export default server;
