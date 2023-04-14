import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { cached, getCachePath, hasCache, hasCacheSync } from './cache';
import fs from 'fs-extra';
import { sendMessage } from './message';
import { formatSize } from './file';

const { net } = require('electron');

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
const requestFormUrl = async (url: string, res: any) => {
  return new Promise((resolve) => {
    let blob: any = Buffer.alloc(0),
      fileSize: any = 0;
    const request = net.request(url);
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
        resolve('');
      });
      response.on('error', () => {
        sendMessage('net 请求 error');
      });
    });
    request.end();
    res.on('close', () => {
      request.abort();
      sendMessage('close');
    });
  });
};
// req 路由监听空 res 上下文函数
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, {
    //设置允许跨域的域名，*代表允许任意域名跨域
    'Access-Control-Allow-Origin': '*',
  });
  // 路由监控
  const reqUrl = req?.url;
  if (reqUrl) {
    if (reqUrl.startsWith('/getByte')) {
      const url = reqUrl.replace('/getByte?url=', '');
      if (hasCacheSync(url)) {
        hasFileExist(url, req, res);
        return;
      }
      const range = req.headers.range;
      await requestFormUrl(url, res);

      // if (range) {
      //   //有range头才使用206状态码
      //   const parts = range.replace(/bytes=/, '').split('-');
      //   const start = parseInt(parts[0], 10);
      //   let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
      //   // end 在最后取值为 fileSize - 1
      //   end = end > blob.length - 1 ? blob.length - 1 : end;
      //
      //   const head = {
      //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      //     'Accept-Ranges': 'bytes',
      //     // 'Content-Length': chunksize,
      //     'Content-Type': 'video/*',
      //   };
      //   res.writeHead(206, head);
      //   console.log('[write]', blob.length, '-', start, '-', end);
      //   res.write(blob.slice(start, end));
      // }
    }
  } else {
    res.end();
  }
});
server.listen(3333, '127.0.0.1', () => {
  console.log('http://127.0.0.1:3333/');
});

export default server;
