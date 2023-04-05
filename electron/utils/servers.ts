import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { cached, getCachePath } from './cache';
import fs from 'fs-extra';
import { Readable } from 'stream';

const { net } = require('electron');

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
      const reqHeader = req.headers;
      const request = net.request(url);
      request.on('response', (response) => {
        const header = response.headers;
        const length = +header['content-length'];
        let blob = Buffer.alloc(0);
        response.on('data', (chunk) => {
          blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
          console.log('recive.... ' + +(blob.length / +length).toFixed(4) * 100 + '%');
          res.write(chunk, (e) => {
            console.error('a' + e);
          });
        });
        response.on('end', () => {
          cached(url, blob);
          res.end();
          console.log('end....');
        });
        response.on('error', () => {
          console.log('出错');
          res.end();
        });
      });
      request.end();
    }
  } else {
    res.end();
  }
});
server.listen(3333, '127.0.0.1', () => {
  console.log('http://127.0.0.1:3333/');
});

export default server;
